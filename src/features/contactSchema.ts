import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Имя слишком короткое"),
  phone: z.string().min(5, "Некорректный телефон"),
  email: z.email("Некорректный email"),
  comment: z.string().min(5, "Комментарий слишком короткий"),
})

export type ContactFormData = z.infer<typeof contactSchema>