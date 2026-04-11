# 🚀 Task Manager API

A full-featured REST API built with **Node.js**, **Express**, **TypeScript**, and **SQL**.

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
- 🧠 Clean Architecture (Controller → Service → Repository)
- 🛡️ Centralized Error Handling
- 🧩 Custom AppError class
- 🧬 Extended Express Request with TypeScript (`req.user`)
- ⚡ Fully typed with TypeScript

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
- Middleware verifies the token and attaches the user to the request:

```ts
req.user.id
