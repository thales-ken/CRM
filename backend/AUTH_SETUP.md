# CRM Backend Setup & Authentication Guide

## Overview

The backend is a Node.js/Express server with SQLite database and JWT authentication. It provides:

- ✅ User authentication (login/register)
- ✅ Password hashing with bcrypt
- ✅ JWT token generation and validation
- ✅ Role-based access control (RBAC)
- ✅ RESTful API endpoints

## Quick Start

### 1. Install Dependencies

```bash
cd backend
yarn install
```

### 2. Run Migrations

The first time you run the server, migrations will automatically create the database schema:

```bash
yarn dev
```

The server will:
- Create SQLite database at `data/db.sqlite3`
- Create tables: `users`, `contacts`, `deals`, `activities`
- Seed test users automatically

### 3. Test Credentials

Use these accounts to test:

| Email | Password | Role |
|-------|----------|------|
| admin@demo.com | password123 | admin |
| manager@demo.com | password123 | manager |
| sales@demo.com | password123 | sales_rep |
| viewer@demo.com | password123 | viewer |

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager', 'sales_rep', 'viewer') DEFAULT 'sales_rep',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Authentication Routes

All endpoints return JSON responses.

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@demo.com",
  "password": "password123"
}

Response:
{
  "user": {
    "id": 1,
    "email": "admin@demo.com",
    "name": "Admin User",
    "role": "admin",
    "createdAt": "2024-01-27T..."
  },
  "token": "eyJhbGc..."
}
```

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "securepassword",
  "name": "New User"
}

Response:
{
  "user": {...},
  "token": "eyJhbGc..."
}
```

#### Verify Token
```
GET /api/auth/verify
Authorization: Bearer <token>

Response:
{
  "id": 1,
  "email": "admin@demo.com",
  "name": "Admin User",
  "role": "admin",
  "createdAt": "2024-01-27T..."
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response: User object (same as verify)
```

## Protected Routes

All data endpoints (contacts, deals, activities) should use the Authorization header:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3001/api/contacts
```

## Environment Variables

Configure in `.env`:

```env
PORT=3001                              # Server port
NODE_ENV=development                   # development or production
DB_CLIENT=sqlite3                      # Database type: sqlite3 or pg
DB_FILE=data/db.sqlite3                # SQLite database file path
JWT_SECRET=your-secret-key-here        # Secret for JWT signing (change in production!)
CORS_ORIGIN=http://localhost:5173      # Frontend URL
```

## Password Security

- Passwords are hashed using bcrypt with salt rounds of 10
- Never send plain text passwords in responses
- Always use HTTPS in production

## JWT Tokens

- **Expiration**: 7 days
- **Algorithm**: HS256
- **Contains**: user id, email, name, and role
- **Usage**: Include in Authorization header as `Bearer <token>`

## User Roles & Permissions

| Role | Permissions |
|------|-------------|
| admin | Full access to all resources |
| manager | Access to team data and reports |
| sales_rep | Access to assigned deals and contacts |
| viewer | Read-only access to limited data |

## Development Commands

```bash
# Start development server with hot reload
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## Database Files

- **SQLite**: `data/db.sqlite3` (auto-created)
- **Migrations**: `src/db/migrations/`
- **Seeds**: `src/db/seeds/`

## Troubleshooting

### Database already exists
Delete `data/db.sqlite3` and restart the server.

### JWT_SECRET error
Set `JWT_SECRET` in `.env` file (default is set, but should be changed in production).

### CORS errors
Update `CORS_ORIGIN` in `.env` to match your frontend URL.

### Password verification fails
Make sure bcryptjs is installed: `yarn add bcryptjs`

## Production Deployment

1. **Change JWT_SECRET** to a strong random string
2. **Use PostgreSQL** instead of SQLite for production
3. **Set NODE_ENV=production**
4. **Use HTTPS** for all API calls
5. **Implement rate limiting** on auth endpoints
6. **Add request logging** and monitoring
7. **Backup database** regularly

## Next Steps

1. ✅ Backend is set up and running
2. ✅ Frontend is configured to use real API
3. Try logging in with test credentials
4. Create new users via registration
5. Implement role-based features in frontend

## Support

For issues or questions, check:
- `src/routes/auth.ts` - Authentication logic
- `src/middleware/auth.ts` - JWT validation
- `src/db/migrations/003_create_users_table.ts` - Database schema
