const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export type UserRole = 'admin' | 'manager' | 'sales_rep' | 'viewer';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Mock data for testing
const MOCK_USERS: { [key: string]: { password: string; user: User } } = {
  'admin@demo.com': {
    password: 'password123',
    user: {
      id: 1,
      email: 'admin@demo.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
    },
  },
  'manager@demo.com': {
    password: 'password123',
    user: {
      id: 2,
      email: 'manager@demo.com',
      name: 'Manager User',
      role: 'manager',
      createdAt: new Date().toISOString(),
    },
  },
  'sales@demo.com': {
    password: 'password123',
    user: {
      id: 3,
      email: 'sales@demo.com',
      name: 'Sales Rep',
      role: 'sales_rep',
      createdAt: new Date().toISOString(),
    },
  },
};

// Check if we should use mock or real API
const USE_MOCK_AUTH = false; // Set to true for offline testing

const generateMockToken = (userId: number): string => {
  return `mock_token_${userId}_${Date.now()}`;
};

export const authAPI = {
  async login(email: string, password: string): Promise<AuthResponse> {
    if (USE_MOCK_AUTH) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const user = MOCK_USERS[email];
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }

      return {
        user: user.user,
        token: generateMockToken(user.user.id),
      };
    }

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Login failed');
    }
    return res.json();
  },

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    if (USE_MOCK_AUTH) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (MOCK_USERS[email]) {
        throw new Error('Email already registered');
      }

      const newId = Object.keys(MOCK_USERS).length + 1;
      const newUser: User = {
        id: newId,
        email,
        name,
        role: 'sales_rep',
        createdAt: new Date().toISOString(),
      };

      MOCK_USERS[email] = {
        password,
        user: newUser,
      };

      return {
        user: newUser,
        token: generateMockToken(newId),
      };
    }

    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Registration failed');
    }
    return res.json();
  },

  async verifyToken(token: string): Promise<User> {
    if (USE_MOCK_AUTH) {
      // Mock token verification
      return {
        id: 1,
        email: 'admin@demo.com',
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
    }

    const res = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Token verification failed');
    return res.json();
  },

  async logout(): Promise<void> {
    // Optional: notify backend of logout if needed
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};
