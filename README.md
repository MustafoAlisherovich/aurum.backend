# 🍽️ Restaurant Booking System - Backend API

RESTful API for the Restaurant Booking System.  
Handles reservations, business logic, authentication, image uploads, email automation, and restaurant management features.

> Frontend Repository:  
> https://github.com/MustafoAlisherovich/aurum.frontend

---

## ✨ Features

### Reservation System
- Reservation CRUD operations
- Booking status management
- Capacity limit validation
- Time-slot availability checking

### Email Automation
- Automated emails using Nodemailer
- Review request emails after completed reservations

### Menu & Gallery Management
- Dish management APIs
- Gallery image uploads
- Image optimization with ImageKit

### Reviews & Moderation
- Customer review submission
- Review visibility moderation

### Restaurant Settings
- Dynamic restaurant configuration
- Opening hours management
- Contact information APIs

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer
- ImageKit

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
ADMIN_USERNAME=
ADMIN_PASSWORD=

IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=

SMTP_HOST=
SMTP_PASSWORD=
SMTP_PORT=
SMTP_USER=

CLIENT_URL=http://localhost:8080
```

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/MustafoAlisherovich/aurum.backend.git
cd aurum.backend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run server
```

---

## 📁 Project Structure

```bash
controllers/
models/
routes/
middlewares/
utils/
config/
scripts/
services/
template/
app.js
```

---

## 🔐 API Features

- RESTful architecture
- Error handling middleware
- Validation and sanitization
- Secure environment variables
- Modular route structure

---

## 👨‍💻 Developed By

Mustafo Alisherovich

Responsibilities:
- Backend Architecture
- Database Design
- API Development
- Reservation Logic
- Email Automation

---

## 📄 License

Licensed under the [MIT License](./LICENSE).
