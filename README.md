# 🚀 Task Manager API 

A full-featured REST API built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**.

This project follows a clean and scalable architecture using:

* Controllers
* Services
* Repositories
* Middleware

---

## 🔥 Features

* ✅ User Registration & Login
* 🔐 JWT Authentication
* 📋 Task CRUD (Create, Read, Update, Delete)
* 🧠 Clean Architecture (Controller → Service → Repository)
* 🛡️ Error Handling Middleware
* ⚡ TypeScript for type safety

---

## 🛠️ Tech Stack

* Node.js
* Express
* TypeScript
* SQL
* JWT (Authentication)
* bcrypt (Password hashing)

---

## 📁 Project Structure

```
src/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── middlewares/
 ├── routes/
 ├── db/
 └── config/
```

---

## ⚙️ Setup

### 1. Clone the repo

```
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env`

```
PORT=5000
DB_USER=your_user
DB_HOST=localhost
DB_DATABASE=your_db
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_secret
```

### 4. Run the server

```
npm run dev
```

---

## 📌 API Endpoints

### 🔐 Auth

* `POST /api/register`
* `POST /api/login`

### 📋 Tasks

* `GET /api/tasks`
* `GET /api/tasks/:id`
* `POST /api/tasks`
* `PUT /api/tasks/:id`
* `DELETE /api/tasks/:id`

---

## 🧠 Author

Built by **Yordan Borisov** 💪

---

## ⭐ Future Improvements

* Refresh Tokens
* Role-based access (admin/user)
* Validation with Zod / Joi
* Swagger API Docs
* Docker support

---

MIT
