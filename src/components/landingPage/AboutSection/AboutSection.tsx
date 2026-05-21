import styles from "./AboutSection.module.scss"

export const AboutSection = () => {
  return (
    <section className={styles.section}>
      <h2>О себе</h2>

      <p>
        Разрабатываю frontend-приложения на React и TypeScript.
      </p>

      <h3>Стек</h3>
      <ul>
        <li>React + Vite</li>
        <li>TypeScript</li>
        <li>SCSS</li>
        <li>Node.js (API)</li>
      </ul>

      <h3>Направления</h3>
      <ul>
        <li>Frontend разработка</li>
        <li>UI архитектура</li>
        <li>Интеграция API</li>
      </ul>
    </section>
  )
}
