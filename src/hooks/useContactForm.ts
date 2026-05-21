import { useForm } from "react-hook-form"
import { contactResolver } from "../features/contactResolver"
import type { ContactFormData } from "../features/contactSchema"

export const useContactForm = () => {
  const form = useForm<ContactFormData>({
    resolver: contactResolver,
    mode: "onSubmit",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      comment: "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error("Request failed")
    }

    return res.json()
  }

  return {
    form,
    onSubmit,
  }
}