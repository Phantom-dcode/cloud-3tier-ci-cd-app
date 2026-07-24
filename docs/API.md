# Enterprise Multi-Tier REST API Documentation

## Base URL
- Production API: `https://api.yourdomain.com/api`
- Local / Development API: `http://localhost:3000/api`

## Authentication
All protected routes require a JSON Web Token (JWT) provided in the `Authorization` HTTP header:
```http
Authorization: Bearer <YOUR_JWT_TOKEN>
```

---

## Auth Endpoints (`/api/auth`)

### 1. Register Account
- **Method:** `POST`
- **Route:** `/api/auth/register`
- **Auth Required:** No
- **Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "password": "SecurePassword123!",
  "role": "user",
  "department": "DevOps Engineering"
}
```
- **Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Account registered successfully.",
  "data": {
    "user": {
      "id": "usr-1721800000",
      "name": "Jane Doe",
      "email": "jane@company.com",
      "role": "user",
      "status": "active"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  }
}
```

### 2. Login
- **Method:** `POST`
- **Route:** `/api/auth/login`
- **Auth Required:** No
- **Request Body:**
```json
{
  "email": "admin@cloud enterprise.com",
  "password": "admin123"
}
```

---

## User Management Endpoints (`/api/users`)

### 1. Get All Users
- **Method:** `GET`
- **Route:** `/api/users?search=cloud&role=admin&page=1&limit=10`
- **Auth Required:** Yes (`Bearer`)
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 4,
    "totalPages": 1
  }
}
```

### 2. Provision User
- **Method:** `POST`
- **Route:** `/api/users`
- **Auth Required:** Yes (`admin` role)

---

## Product Catalog Endpoints (`/api/products`)

### 1. Get Products
- **Method:** `GET`
- **Route:** `/api/products?category=Cloud Solutions`
- **Auth Required:** Yes

---

## Order Fulfillment Endpoints (`/api/orders`)

### 1. Create Purchase Order
- **Method:** `POST`
- **Route:** `/api/orders`
- **Auth Required:** Yes

---

## Dashboard Telemetry Endpoints (`/api/dashboard`)

### 1. Get Live Telemetry
- **Method:** `GET`
- **Route:** `/api/dashboard/stats`
- **Auth Required:** Yes
