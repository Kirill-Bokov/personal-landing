import { ContactForm } from "./ContactForm"
import styles from "./ContactSection.module.scss"
export const ContactSection = () => {
  return (
    <section className={styles.section}>
      <h2>Контакты</h2>

      <ContactForm />

      <div>
        <p>Email: kirill37reg2@mail.com</p>
        <p>GitHub: https://github.com/Kirill-Bokov</p>
      </div>
    </section>
  )
}
