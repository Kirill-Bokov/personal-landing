export const ProjectsSection = () => {
  return (
    <div className="container">
      <section>
        <h2>Основные проекты</h2>

        <div>
          <h3>Moda-Lab</h3>

          <p>
            Клиент fullstack-приложения интернет-магазина одежды
          </p>

          <p>
            Демо:{" "}
            <a href="https://kirill-bokov.github.io/moda-lab/" target="_blank">
              https://kirill-bokov.github.io/moda-lab/
            </a>
          </p>

          <p>
            Репозиторий:{" "}
            <a href="https://github.com/Kirill-Bokov/moda-lab" target="_blank">
              github.com/Kirill-Bokov/moda-lab
            </a>
          </p>

          <p>
            Стек: React, TypeScript, Redux Toolkit (RTK Query), React Router DOM, Tailwind CSS, Vite,
            Radix UI, MSW, Vitest, React Testing Library, ESLint, Heroicons
          </p>

          <ul>
            <li>SPA-архитектура с клиентской маршрутизацией и централизованным состоянием</li>
            <li>JWT-аутентификация (access + refresh через httpOnly cookie)</li>
            <li>RTK Query для работы с REST API и кэшированием</li>
            <li>Каталог товаров: поиск, фильтрация, сортировка</li>
            <li>Корзина и избранное с серверной синхронизацией</li>
            <li>MSW для мокирования API</li>
            <li>Тестирование через Vitest и React Testing Library</li>
          </ul>
        </div>

        <div>
          <h3>function-learn</h3>

          <p>
            Двуязычное приложение-учебник языков программирования с интеграцией LLM (GigaChat)
          </p>

          <p>
            Репозиторий:{" "}
            <a href="https://github.com/Kiril-Bokov/function-learn" target="_blank">
              github.com/Kiril-Bokov/function-learn
            </a>
          </p>

          <p>
            Стек: React, TypeScript, React Router DOM, Vite, React Error Boundary, React Markdown,
            React Toastify, ESLint, GigaChat API
          </p>

          <ul>
            <li>Мультиязычный интерфейс (RU/EN)</li>
            <li>Полностью клиентское хранение данных</li>
            <li>Error Boundary для устойчивости к runtime-ошибкам</li>
            <li>Интеграция GigaChat API</li>
            <li>Тестирование устойчивости через эмуляцию HTTP-ошибок</li>
          </ul>
        </div>

        <div>
          <h3>IEMIS</h3>

          <p>
            CRUD fullstack-приложение для управления работой небольшого предприятия
          </p>

          <p>
            Репозиторий:{" "}
            <a href="https://github.com/Kirill-Bokov/iemis" target="_blank">
              github.com/Kirill-Bokov/iemis
            </a>
          </p>

          <p>
            Стек: React, TypeScript, Vite, ESLint (frontend), NestJS, TypeORM, PostgreSQL, RxJS (backend)
          </p>
        </div>
      </section>
    </div>
  )
}