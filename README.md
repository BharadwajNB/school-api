# School Management API

> A RESTful API built with **Node.js** and **Express.js** for managing school data — including adding schools and retrieving them sorted by proximity to a given location.

[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)](https://www.mysql.com/)
[![Deployed on Render](https://img.shields.io/badge/Deployed-Render-purple?logo=render)](https://render.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🔗 Live Demo

**Base URL:** `https://school-api-11uo.onrender.com`

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Database Schema](#️-database-schema)
- [API Reference](#-api-reference)
- [Distance Calculation](#-distance-calculation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Author](#-author)

---

## ✨ Features

- **Add Schools** — Store school records with name, address, and geographic coordinates
- **Proximity Search** — Retrieve schools sorted by distance from a user-supplied location
- **MySQL Integration** — Persistent data storage via Railway-hosted MySQL
- **RESTful Design** — Clean, predictable endpoint structure
- **Cloud Deployed** — Hosted on Render with securely managed environment variables

---

## 🛠️ Tech Stack

| Layer | Technology |
|------------|------------------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MySQL (Railway) |
| Hosting | Render |
| Testing | Postman |

---

## 📁 Project Structure

```
school-api/
├── src/
│   ├── controllers.js   # Request handlers and business logic
│   ├── db.js            # MySQL connection configuration
│   └── routes.js        # API route definitions
├── app.js               # Application entry point
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v14+
- MySQL database (local or hosted)
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/BharadwajNB/school-api.git
cd school-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=your_port
```

### 4. Start the Server

```bash
npm start
```

The server will be running at `http://localhost:3000`.

---

## 🗄️ Database Schema

```sql
CREATE TABLE schools (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(255) NOT NULL,
  address   VARCHAR(255) NOT NULL,
  latitude  FLOAT        NOT NULL,
  longitude FLOAT        NOT NULL
);
```

---

## 📡 API Reference

### `POST /addSchool`

Adds a new school to the database.

**Request Body**

```json
{
  "name": "ABC School",
  "address": "Hyderabad",
  "latitude": 17.4,
  "longitude": 78.5
}
```

**Response** `201 Created`

```json
{
  "message": "School added",
  "id": 1
}
```

---

### `GET /listSchools`

Returns all schools sorted by distance from the provided coordinates.

**Query Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `latitude` | float | ✅ | User's current latitude |
| `longitude` | float | ✅ | User's current longitude |

**Example Request**

```
GET /listSchools?latitude=17.4&longitude=78.5
```

**Response** `200 OK`

```json
[
  {
    "id": 1,
    "name": "ABC School",
    "distance": 0
  }
]
```

---

## 📏 Distance Calculation

Schools are ranked using the **Haversine formula**, which calculates the great-circle distance between two points on a sphere using their latitude and longitude coordinates. This ensures accurate proximity sorting regardless of geographic scale.

---

## 🧪 Testing

The API is fully tested using **Postman**.

🔗 [View Postman Collection](https://nbcreations01-1623692.postman.co/workspace/425eb957-7fef-43af-8ec0-bac9ae1a623b/collection/53910681-455c1cd0-c46f-4cfe-8ad6-eb39a8d36acd?action=share&source=copy-link&creator=53910681)

---

## ☁️ Deployment

- **Platform:** [Render](https://render.com/)
- **Database:** [Railway](https://railway.app/) (MySQL)
- **Configuration:** All sensitive credentials are managed via environment variables — never committed to source control.

---

## 👨‍💻 Author

**Madem Venkata Bharadwaj**

Built as part of a Node.js backend development assignment to demonstrate API design, database integration, and cloud deployment skills.

---

## ⭐ Acknowledgements

- [Express.js](https://expressjs.com/) for the minimal and flexible web framework
- [Railway](https://railway.app/) for managed MySQL hosting
- [Render](https://render.com/) for seamless deployment
