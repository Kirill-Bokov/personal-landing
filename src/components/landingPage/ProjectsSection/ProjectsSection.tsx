import styles from "./ProjectsSection.module.scss"

export const ProjectsSection = () => {

  return (
    <section className={styles.section}>
      <h2>Проекты</h2>

      <div>
        <h3>Интернет-магазин (учебный)</h3>
        <p>React + API + фильтрация + архитектура feature-based</p>
      </div>

      <div>
        <h3>Лендинг с serverless формой</h3>
        <p>Vite + Vercel Functions + Resend email integration</p>
      </div>
    </section>
  )
}