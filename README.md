# 📝 To-Do List App

A full-stack, cloud-integrated To-Do List application built with modern web technologies, featuring authentication, premium functionality, payment integration, caching, and containerized deployment.

---

## 🚀 Live Demo

🔗 https://v0-to-do-list-app-eta-six.vercel.app/

---

## ✨ Features

* 🔐 Authentication (Email & Google via Supabase)
* 📝 Task Management (Create, Update, Delete)
* 📊 Dashboard with categorized tasks
* 💳 Premium Upgrade via Razorpay
* ⏰ Reminder & Alarm (Premium Feature)
* ⚡ Redis Caching for performance optimization
* 🐳 Docker Containerization
* ☸️ Kubernetes Deployment & Scaling

---

## 🏗️ System Architecture
<img width="1536" height="1024" alt="ChatGPT Image Apr 22, 2026, 03_57_44 AM" src="https://github.com/user-attachments/assets/bf71b097-e4a4-44c3-acd5-c6bc87a6b7e8" />

```id="flow1"
Frontend (Next.js)
        ↓
Backend API (Next.js)
        ↓
Supabase Auth + PostgreSQL Database
        ↓
Razorpay (Payment Gateway)
        ↓
Redis (Caching Layer)
        ↓
Docker (Containerization)
        ↓
Kubernetes (Scaling & Orchestration)
        ↓
Deployment (Vercel / Local Cluster)
```

---

## 🛠️ Tech Stack

* **Frontend:** Next.js, Tailwind CSS
* **Backend:** Next.js API Routes
* **Database:** Supabase (PostgreSQL)
* **Authentication:** Supabase Auth
* **Payments:** Razorpay
* **Caching:** Redis
* **Containerization:** Docker
* **Orchestration:** Kubernetes
* **Deployment:** Vercel

---

## ⚙️ Installation

```id="cmd1"
npm install
npm run dev
```

---

## 🐳 Docker

```id="cmd2"
docker build -t todo-app .
docker run -p 3000:3000 todo-app
```

---

## ☸️ Kubernetes

```id="cmd3"
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl get pods
```

---

## 🔒 Premium Feature

Reminder & Alarm system is available only for premium users.
Users can upgrade using Razorpay integration.

---

## 📌 Key Learnings

* Full Stack Development
* Cloud & Deployment
* Docker & Kubernetes
* Payment Gateway Integration
* Redis Caching

---

## 👨‍💻 Author

**Shyamal Jana**
