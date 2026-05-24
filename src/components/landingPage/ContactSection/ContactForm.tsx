import { useState } from "react"
import { useContactForm } from "../../../hooks/useContactForm"
import type { ContactFormStatus } from "../../../types/ContactForm"
import styles from "./ContactForm.module.scss"

export const ContactForm = () => {
  const { form, onSubmit } = useContactForm()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form

  const [status, setStatus] = useState<ContactFormStatus>("idle")

  const submitHandler = async (data: any) => {
    setStatus("loading")

    try {
      await onSubmit(data)
      setStatus("success")
      reset()
    } catch {
      setStatus("error")
    }
  }

  const isDisabled = status === "loading"

  return (
    <div className="container">
      <section >
        <div className={styles.wrapper}>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className={styles.form}
          >
            <h2 className={styles.title}>Обратная связь</h2>

            <input
              className={styles.input}
              placeholder="Имя"
              {...register("name")}
              disabled={isDisabled}
            />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}

            <input
              className={styles.input}
              placeholder="Телефон"
              {...register("phone")}
              disabled={isDisabled}
            />
            {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

            <input
              className={styles.input}
              placeholder="Email"
              {...register("email")}
              disabled={isDisabled}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}

            <textarea
              className={styles.textarea}
              placeholder="Комментарий"
              {...register("comment")}
              disabled={isDisabled}
            />
            {errors.comment && (
              <p className={styles.error}>{errors.comment.message}</p>
            )}

            <button
              type="submit"
              className={`${styles.button} ${status === "loading" ? styles.loading : ""
                }`}
              disabled={isDisabled}
            >
              {status === "loading" ? "Отправка..." : "Отправить"}
            </button>

            {status === "success" && (
              <div className={styles.success}>
                Заявка успешно отправлена
              </div>
            )}

            {status === "error" && (
              <div className={styles.errorBox}>
                Ошибка отправки. Попробуйте позже.
              </div>
            )}
          </form>
        </div>
      </section>
      <input
        name="company"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>

  )
}
