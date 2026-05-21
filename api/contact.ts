import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Resend } from "resend"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY!)

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email(),
  comment: z.string().min(5),
})

type ContactInput = z.infer<typeof contactSchema>


export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const data = contactSchema.parse(req.body) as ContactInput

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.OWNER_EMAIL!,
      subject: "New contact form",
      html: `
        <p>${data.name}</p>
        <p>${data.phone}</p>
        <p>${data.email}</p>
        <p>${data.comment}</p>
      `,
    })

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: data.email,
      subject: "Мы получили ваш запрос",
      html: `Спасибо, ${data.name}`,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(400).json({
      ok: false,
      error: "Невалидный запрос",
    })
  }
}