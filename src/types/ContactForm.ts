export interface ContactFormData {
  name: string
  phone: string
  email: string
  comment: string
}

export type ContactFormStatus = "idle" | "loading" | "success" | "error"