import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema } from "./contactSchema"

export const contactResolver = zodResolver(contactSchema)