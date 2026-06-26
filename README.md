# 🍲 Adukkala

Adukkala is a full-stack recipe discovery application that allows users to search recipes, view detailed cooking information, authenticate using Email/Password or Google, and manage their favorite recipes.

The project consists of a modern Next.js frontend and an Express.js backend built with TypeScript, Prisma ORM, and PostgreSQL.

---

## ✨ Features

### Authentication

- User Registration
- User Login
- Google Authentication
- JWT Authentication
- Protected Routes

### Recipes

- Search recipes
- View recipe details
- Nutrition information
- Pagination support

### Favorites

- Save recipes
- Remove recipes
- Paginated favorites list

### Backend

- REST API
- Input validation using Zod
- Global error handling
- Authentication middleware
- Modular project structure

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Axios

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Google OAuth
- Zod Validation

## External APIs

- Spoonacular Recipe API

---

# Project Structure

```
Adukkala
│
├── adukkala-frontend
│   ├── app
│   ├── components
│   ├── actions
│   ├── services
│   └── types
│
└── adukkala-backend
    ├── controllers
    ├── middleware
    ├── prisma
    ├── routes
    ├── services
    ├── utils
    └── validators
```

---

# Backend Architecture

```
Request
    │
    ▼
Routes
    │
    ▼
Validation Middleware
    │
    ▼
Authentication Middleware
    │
    ▼
Controller
    │
    ▼
Service
    │
    ▼
Prisma ORM
    │
    ▼
PostgreSQL
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/google |

---

## Recipes

| Method | Endpoint |
|---------|----------|
| GET | /api/recipes/search |
| GET | /api/recipes/:id |

---

## Favorites

| Method | Endpoint |
|---------|----------|
| POST | /api/favorites |
| GET | /api/favorites |
| DELETE | /api/favorites/:recipeId |

---

# Environment Variables

## Backend

Create a `.env` file inside `adukkala-backend`.

```env
PORT=5000

DATABASE_URL=

JWT_SECRET=
MAX_TOKEN_AGE=

SPOONACULAR_API_KEY=

GOOGLE_CLIENT_ID=
```

## Frontend

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/adukkala.git
```

---

## Backend

```bash
cd adukkala-backend

npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```

---

## Frontend

```bash
cd adukkala-frontend

npm install

npm run dev
```

---

# Build

Backend

```bash
npm run build

npm start
```

Frontend

```bash
npm run build

npm start
```

---

# Future Improvements

- Refresh Token Authentication
- User Profiles
- Recipe Reviews
- Recipe Ratings
- Meal Planner
- Shopping List
- Recipe Filtering
- Dark Mode
- Docker Support
- CI/CD Pipeline

---

# Author

**Adharsh S**
