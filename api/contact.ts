import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Resend } from "resend"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(5),
  email: z.email(),
  comment: z.string().min(5),
  company: z.string().optional(),
})

type ContactInput = z.infer<typeof contactSchema>

function parseBody(req: VercelRequest) {
  if (!req.body) {
    throw new Error("Empty request body")
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body)
    } catch {
      throw new Error("Invalid JSON body")
    }
  }

  return req.body
}

function sendError(
  res: VercelResponse,
  status: number,
  message: string,
  details?: unknown
) {
  return res.status(status).json({
    ok: false,
    error: message,
    details,
  })
}
const ipRequests = new Map<string, number[]>()

const WINDOW_MS = 60_000
const MAX_REQUESTS = 5

function isRateLimited(ip: string) {
  const now = Date.now()

  const requests =
    ipRequests.get(ip) || []

  const validRequests =
    requests.filter(
      timestamp =>
        now - timestamp < WINDOW_MS
    )

  if (validRequests.length >= MAX_REQUESTS) {
    return true
  }

  validRequests.push(now)

  ipRequests.set(
    ip,
    validRequests
  )

  return false
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {

  if (req.method !== "POST") {
    return sendError(res, 405, "Method not allowed")
  }

  const forwardedFor =
    req.headers["x-forwarded-for"]

  const ip =
    typeof forwardedFor === "string"
      ? forwardedFor
        .split(",")[0]
        .trim()
      : req.socket.remoteAddress ||
      "unknown"

  if (isRateLimited(ip)) {
    return sendError(
      res,
      429,
      "Too many requests"
    )
  }

  try {
    const rawBody =
      parseBody(req)

    if (
      rawBody.company?.trim()
    ) {
      return sendError(
        res,
        400,
        "Spam detected"
      )
    }



    let data: ContactInput

    try {
      data = contactSchema.parse(rawBody)
    } catch (err) {
      if (err instanceof z.ZodError) {
        return sendError(
          res,
          422,
          "Validation error",
          err.flatten()
        )
      }

      return sendError(res, 400, "Invalid request data")
    }

    try {
      await resend.emails.send({
        from: "Kirill Bokov Portfolio <onboarding@resend.dev>",
        to: process.env.OWNER_EMAIL!,
        subject: "Новая заявка с портфолио",
        html: `
          <h3>Новое сообщение</h3>
          <p><b>Имя:</b> ${data.name}</p>
          <p><b>Телефон:</b> ${data.phone}</p>
          <p><b>Имейл:</b> ${data.email}</p>
          <p><b>Коммент:</b> ${data.comment}</p>
        `,
      })
    } catch (err) {
      return sendError(
        res,
        502,
        "Failed to send email to owner",
        err instanceof Error ? err.message : err
      )
    }

    try {
      await resend.emails.send({
        from: "Kirill Bokov Portfolio <onboarding@resend.dev>",
        to: data.email,
        subject: "Ваше сообщение было получено!",
        html: `
          <p>Здравствуйте, ${data.name},</p>
          <p>Ваше сообщение было успешно получено. </p>
          <p><b>Name:</b> ${data.name}</p>
          <p><b>Phone:</b> ${data.phone}</p>
          <p><b>Email:</b> ${data.email}</p>
          <p><b>Comment:</b> ${data.comment}</p>
        `,
      })
    } catch (err) {
      return sendError(
        res,
        502,
        "Failed to send confirmation email",
        err instanceof Error ? err.message : err
      )
    }

    return res.status(200).json({
      ok: true,
    })
  } catch (err) {
    return sendError(
      res,
      500,
      "Internal server error",
      err instanceof Error ? err.message : err
    )
  }
}
