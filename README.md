🚀 Task Manager API

A full-featured REST API built with Node.js, Express, TypeScript, and PostgreSQL.

This project follows a clean and scalable architecture using:

- Controllers
- Services
- Repositories
- Middleware

---

## ✨ Features

- ✅ User Registration & Login
- 🔐 JWT Authentication
- 📋 Task CRUD (Create, Read, Update, Delete)
- 🔍 Search (by title)
- 🎯 Filtering (by completed status)
- 📄 Pagination (page & limit)
- 🔽 Sorting (ASC / DESC by date)
- 📊 Advanced API Response (data + meta)
- 🧠 Clean Architecture (Controller → Service → Repository)
- 🛡️ Centralized Error Handling
- 🧩 Custom AppError class
- 🧬 Extended Express Request with TypeScript (req.user)
-⚡ Fully typed with TypeScript

---

## 🛠️ Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT (Authentication)
- bcrypt (Password hashing)

---

## 📁 Project Structure

src/
├── controllers/
├── services/
├── repositories/
├── middlewares/
├── routes/
├── db/
├── config/
├── utils/
└── types/

---

## 🧠 Architecture Overview

This project follows a clean architecture pattern:

- **Controller** → Handles HTTP requests & responses
- **Service** → Contains business logic
- **Repository** → Handles database queries
- **Middleware** → Authentication & error handling

---

## 🔐 Authentication

Authentication is handled using **JWT (JSON Web Tokens)**.

- Token is sent via:
- Authorization: Bearer <token>
- Middleware verifies the token and attaches the user to the request:
- req.user.id

---

## 📋 Tasks API (Advanced)

Get All Tasks (with filters, search, pagination, sorting)

GET /api/tasks

🔹 Query Parameters:

| Param     | Type    | Description                  |
| --------- | ------- | ---------------------------- |
| search    | string  | Search by title              |
| completed | boolean | Filter by completed status   |
| page      | number  | Page number (default: 1)     |
| limit     | number  | Items per page (default: 10) |
| sort      | string  | asc / desc (default: desc)   |

✅ Example Request:
GET /api/tasks?search=task&completed=true&page=1&limit=5&sort=desc

{
  "data": [
    {
      "id": 1,
      "title": "First Task",
      "description": "My first backend task",
      "userId": 5,
      "completed": true,
      "created_at": "2026-04-20T08:54:27.681Z"
    }
  ],
  "meta": {
    "totalItems": 25,
    "itemCount": 5,
    "itemsPerPage": 5,
    "totalPages": 5,
    "currentPage": 1
  }
}

---

## 🧠 How It Works

- Dynamic SQL queries are built based on query parameters
- Uses parameterized queries ($1, $2, ...) to prevent SQL injection
- values[] array maps directly to SQL placeholders
- Filters are applied only if provided
- Pagination uses LIMIT and OFFSET
- Sorting is handled with ORDER BY

---

## 🛡️ Security

- JWT authentication protects routes
- Users can only access their own tasks (userId)
- SQL Injection protection via parameterized queries
- Centralized error handling with custom AppError

---

## 🚀 Setup

1. Clone the repo

git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api

2. Install dependencies

npm install

3. Create .env

PORT=3000
DB_USER=your_user
DB_HOST=localhost
DB_DATABASE=your_db
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_secret

4. Run the server

npm run dev

---

## 🔮 Future Improvements

- 🔁 Refresh Tokens
- 🧑‍💼 Role-based authorization (admin/user)
- 📊 Filtering by date range
- 🔃 Sorting by different fields (title, completed)
- 🔗 Database relations (JOINs)
- 📘 Swagger API documentation
- 🐳 Docker support

---

👨‍💻 Author

Built by Yordan Borisov

---

📜 License

MIT
