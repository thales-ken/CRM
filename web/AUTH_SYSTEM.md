# Authentication System Documentation

## Overview

The CRM application now includes a complete authentication system with role-based access control (RBAC). Users must log in before accessing any part of the application, and different user roles have different permission levels.

## Features

### 1. User Roles & Permissions

Four user roles are available:

- **Admin** (`admin`) - Full access to all features and data
- **Manager** (`manager`) - Access to team data and reports
- **Sales Rep** (`sales_rep`) - Access to assigned deals and contacts
- **Viewer** (`viewer`) - Read-only access to limited data

### 2. Authentication Flow

1. User visits the application
2. If not authenticated, user is redirected to the login page
3. User can either:
   - **Sign In**: Enter existing credentials (email & password)
   - **Sign Up**: Create a new account with name, email, and password
4. On successful authentication, a JWT token is stored in localStorage
5. User is redirected to the dashboard
6. Protected routes verify authentication before granting access

### 3. API Endpoints

Authentication is handled through the following backend endpoints:

```
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
Returns: { user: User, token: string }

POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
Returns: { user: User, token: string }

GET /api/auth/verify
Headers: { Authorization: "Bearer <token>" }
Returns: User
```

### 4. Context & Hooks

#### AuthContext

Global context managing authentication state:

```typescript
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRoles: string[]) => boolean;
}
```

#### useAuth Hook

Use in any component to access authentication:

```typescript
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { user, logout, hasPermission } = useAuth();
  
  // Check if user has specific permissions
  if (hasPermission(['admin', 'manager'])) {
    // Show admin/manager content
  }
  
  return (
    <div>
      Welcome, {user?.name}!
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

### 5. Protected Routes

Routes are protected using the `ProtectedRoute` component:

```typescript
<Route 
  path="/reports" 
  element={
    <ProtectedRoute requiredRoles={['admin', 'manager']}>
      <Reports />
    </ProtectedRoute>
  } 
/>
```

If a user lacks required permissions, they see an "Access Denied" message.

### 6. Session Management

- **Token Storage**: JWT tokens are stored in localStorage
- **Auto-login**: On page refresh, the app verifies the stored token
- **Logout**: Clears token and user data from localStorage
- **User Menu**: Click the avatar in the navbar to view user info and logout

## File Structure

```
src/
├── api/
│   └── auth.ts                 # Auth API client
├── contexts/
│   └── AuthContext.tsx         # Auth state & hooks
├── components/
│   ├── ProtectedRoute.tsx      # Route protection wrapper
│   └── ui/
│       └── NavBar.tsx          # Updated with logout menu
├── pages/
│   └── Login.tsx               # Login/signup page
└── App.tsx                     # Updated with AuthProvider
```

## Usage Examples

### Example 1: Check User Permissions

```typescript
const { user, hasPermission } = useAuth();

if (hasPermission(['admin'])) {
  // Show admin-only features
}

// Show current user role
console.log(user?.role); // 'admin' | 'manager' | 'sales_rep' | 'viewer'
```

### Example 2: Conditional Rendering by Role

```typescript
const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <>
      {user?.role === 'admin' && <AdminStats />}
      {user?.role === 'manager' && <ManagerStats />}
      {user?.role === 'sales_rep' && <SalesStats />}
    </>
  );
};
```

### Example 3: Logout Flow

```typescript
const { logout } = useAuth();

const handleLogout = () => {
  logout();
  // User is automatically redirected to login page
};
```

## Demo Credentials

For testing purposes, use:
- **Email**: admin@demo.com
- **Password**: password123

## Security Considerations

1. **JWT Tokens**: Tokens are stored in localStorage (consider HttpOnly cookies for production)
2. **Password Storage**: Never store plain text passwords (backend should hash with bcrypt)
3. **HTTPS**: Always use HTTPS in production
4. **Token Expiration**: Implement token refresh mechanism for production
5. **CORS**: Configure CORS properly on backend

## Future Enhancements

1. **Token Refresh**: Implement automatic token refresh before expiration
2. **Two-Factor Authentication**: Add 2FA for enhanced security
3. **Password Reset**: Implement forgot password flow
4. **Social Login**: Add OAuth providers (Google, GitHub, etc.)
5. **Audit Logging**: Track user actions by role
6. **Permission Matrix**: Fine-grained permission control per feature
7. **Session Timeout**: Auto-logout after inactivity
8. **Remember Me**: Optional persistent login

## Troubleshooting

### User stays on login page after authentication
- Check if backend is returning valid JWT token
- Verify localStorage is enabled in browser
- Check browser console for API errors

### "Access Denied" message for authorized users
- Verify user role in database matches required roles
- Check `requiredRoles` array in ProtectedRoute
- Ensure token hasn't expired

### Logout not working
- Clear localStorage manually in browser DevTools
- Check if logout endpoint exists on backend
- Verify AuthContext cleanup is called
