export const ContactSection = () => {
  return (
    <section>
      <div className="container">
        <h2>Контакты</h2>

        <div>
          <p>
            Email:{" "}
            <a href="mailto:kirill37reg2@gmail.com">
              kirill37reg2@gmail.com
            </a>
          </p>

          <p>
            GitHub:{" "}
            <a
              href="https://github.com/Kirill-Bokov"
              target="_blank"
              rel="noreferrer"
            >
              github.com/Kirill-Bokov
            </a>
          </p>

          <p>
            Telegram:{" "}
            <a
              href="https://t.me/multi_ocular"
              target="_blank"
              rel="noreferrer"
            >
              @multi_ocular
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}