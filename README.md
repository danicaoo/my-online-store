Интернет-магазин: Каталог товаров с админ-панелью
Этот проект представляет собой интернет-магазин с каталогом товаров и админ-панелью для управления товарами. Проект использует несколько технологий для обеспечения функциональности:

Основные компоненты системы

Клиентская часть (Frontend):
index.html - главная страница каталога товаров
admin.html - панель администратора для управления товарами
Серверная часть (Backend):
productServer.js - REST API для получения списка товаров (порт 3003)
adminServer.js - REST API для управления товарами (добавление/редактирование/удаление) (порт 8080)
graphql.js - GraphQL API для запросов к данным о товарах (порт 4000)
websocketServer.js - WebSocket сервер для реальных обновлений (порт 5001)
Функциональность

Каталог товаров (index.html)

Отображение товаров, сгруппированных по категориям
Автоматическое обновление при изменениях через:
WebSocket соединение
GraphQL подписки
Админ-панель (admin.html)

Добавление новых товаров
Редактирование существующих товаров
Удаление товаров
Получение уведомлений об изменениях через WebSocket и GraphQL
Установка и запуск

Убедитесь, что у вас установлен Node.js (версия 12 или выше)
Установите зависимости:
bash
npm install express cors ws graphql express-graphql
Запустите серверы (в разных терминалах):
bash
node productServer.js
node adminServer.js
node graphql.js
node websocketServer.js
Откройте в браузере:
Каталог товаров: http://localhost:3003/index.html
Админ-панель: http://localhost:8080/admin.html
GraphiQL интерфейс: http://localhost:4000/graphql
API Endpoints

REST API (Product Server)

GET /products - получить список всех товаров
REST API (Admin Server)

POST /admin/products - добавить новый товар
PUT /admin/products/:id - обновить товар
DELETE /admin/products/:id - удалить товар
GraphQL API

Доступные запросы:

products - получить все товары
product(id: ID!) - получить товар по ID
productNamesAndPrices - получить только названия и цены товаров
WebSocket

ws://localhost:5001 - для реальных обновлений
Структура данных

Данные хранятся в файле data/products.json в следующем формате:

json
{
  "products": [
    {
      "id": 1,
      "name": "Название товара",
      "price": 1000,
      "description": "Описание товара",
      "categories": ["Категория1", "Категория2"]
    }
  ]
}
Технологии

Frontend: HTML, JavaScript
Backend: Node.js, Express
API: REST, GraphQL
Реальные обновления: WebSocket
Дополнительно: Apollo Client для работы с GraphQL
