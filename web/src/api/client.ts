const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Helper to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'prospect';
  photo?: string | null;
  createdAt: string;
}

export interface Deal {
  id: number;
  title: string;
  company: string;
  value: number;
  stage: 'negotiation' | 'proposal' | 'won' | 'lost';
  probability: number;
  closeDate: string;
  owner: string;
}

export interface Activity {
  id: number;
  type: 'call' | 'email' | 'meeting' | 'note';
  description: string;
  date: string;
  contactId?: number;
  dealId?: number;
  userId?: number;
  userName?: string;
  userEmail?: string;
  createdAt?: string;
}

// Contacts API
export const contactsAPI = {
  async getAll(): Promise<Contact[]> {
    const res = await fetch(`${API_BASE_URL}/contacts`);
    if (!res.ok) throw new Error('Failed to fetch contacts');
    return res.json();
  },

  async getById(id: number): Promise<Contact> {
    const res = await fetch(`${API_BASE_URL}/contacts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch contact');
    return res.json();
  },

  async create(data: Omit<Contact, 'id' | 'createdAt' | 'status'>): Promise<Contact> {
    const res = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create contact');
    return res.json();
  },

  async update(id: number, data: Partial<Contact>): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update contact');
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete contact');
  },
};

// Deals API
export const dealsAPI = {
  async getAll(): Promise<Deal[]> {
    const res = await fetch(`${API_BASE_URL}/deals`);
    if (!res.ok) throw new Error('Failed to fetch deals');
    return res.json();
  },

  async getById(id: number): Promise<Deal> {
    const res = await fetch(`${API_BASE_URL}/deals/${id}`);
    if (!res.ok) throw new Error('Failed to fetch deal');
    return res.json();
  },

  async create(data: Omit<Deal, 'id'>): Promise<Deal> {
    const res = await fetch(`${API_BASE_URL}/deals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create deal');
    return res.json();
  },

  async update(id: number, data: Partial<Deal>): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/deals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update deal');
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/deals/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete deal');
  },
};

// Activities API
export const activitiesAPI = {
  async getAll(): Promise<Activity[]> {
    const res = await fetch(`${API_BASE_URL}/activities`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch activities');
    return res.json();
  },

  async getById(id: number): Promise<Activity> {
    const res = await fetch(`${API_BASE_URL}/activities/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch activity');
    return res.json();
  },

  async create(data: Omit<Activity, 'id'>): Promise<Activity> {
    const token = localStorage.getItem('authToken');
    console.log('[activitiesAPI.create] Token:', token ? `${token.slice(0, 20)}...` : 'NO TOKEN');
    const res = await fetch(`${API_BASE_URL}/activities`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Failed to create activity: ${error}`);
    }
    const result = await res.json();
    console.log('[activitiesAPI.create] Result:', result);
    return result;
  },

  async update(id: number, data: Partial<Activity>): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/activities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update activity');
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/activities/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete activity');
  },
};
