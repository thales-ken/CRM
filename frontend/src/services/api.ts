import type { Contact, Lead, Task, Company, User, Activity } from '../types';
import {
  mockContacts,
  mockLeads,
  mockTasks,
  mockCompanies,
  mockUsers,
  mockActivities,
} from '../mocks/data';

// Simulated API delay
const API_DELAY = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Contact Service
export const contactService = {
  async getAll(): Promise<Contact[]> {
    await delay(API_DELAY);
    return mockContacts;
  },

  async getById(id: string): Promise<Contact | null> {
    await delay(API_DELAY);
    return mockContacts.find((c) => c.id === id) || null;
  },

  async create(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    await delay(API_DELAY);
    const newContact: Contact = {
      ...contact,
      id: `contact${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockContacts.push(newContact);
    return newContact;
  },

  async update(id: string, contact: Partial<Contact>): Promise<Contact | null> {
    await delay(API_DELAY);
    const index = mockContacts.findIndex((c) => c.id === id);
    if (index === -1) return null;
    const updated = { ...mockContacts[index], ...contact, updatedAt: new Date() };
    mockContacts[index] = updated;
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    await delay(API_DELAY);
    const index = mockContacts.findIndex((c) => c.id === id);
    if (index === -1) return false;
    mockContacts.splice(index, 1);
    return true;
  },

  async getByCompany(companyId: string): Promise<Contact[]> {
    await delay(API_DELAY);
    return mockContacts.filter((c) => c.company === companyId);
  },
};

// Lead Service
export const leadService = {
  async getAll(): Promise<Lead[]> {
    await delay(API_DELAY);
    return mockLeads;
  },

  async getById(id: string): Promise<Lead | null> {
    await delay(API_DELAY);
    return mockLeads.find((l) => l.id === id) || null;
  },

  async create(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> {
    await delay(API_DELAY);
    const newLead: Lead = {
      ...lead,
      id: `lead${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockLeads.push(newLead);
    return newLead;
  },

  async update(id: string, lead: Partial<Lead>): Promise<Lead | null> {
    await delay(API_DELAY);
    const index = mockLeads.findIndex((l) => l.id === id);
    if (index === -1) return null;
    const updated = { ...mockLeads[index], ...lead, updatedAt: new Date() };
    mockLeads[index] = updated;
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    await delay(API_DELAY);
    const index = mockLeads.findIndex((l) => l.id === id);
    if (index === -1) return false;
    mockLeads.splice(index, 1);
    return true;
  },

  async getByStage(stage: string): Promise<Lead[]> {
    await delay(API_DELAY);
    return mockLeads.filter((l) => l.stage === stage);
  },

  async getByAssignee(userId: string): Promise<Lead[]> {
    await delay(API_DELAY);
    return mockLeads.filter((l) => l.assignedTo === userId);
  },
};

// Task Service
export const taskService = {
  async getAll(): Promise<Task[]> {
    await delay(API_DELAY);
    return mockTasks;
  },

  async getById(id: string): Promise<Task | null> {
    await delay(API_DELAY);
    return mockTasks.find((t) => t.id === id) || null;
  },

  async create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    await delay(API_DELAY);
    const newTask: Task = {
      ...task,
      id: `task${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockTasks.push(newTask);
    return newTask;
  },

  async update(id: string, task: Partial<Task>): Promise<Task | null> {
    await delay(API_DELAY);
    const index = mockTasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    const updated = { ...mockTasks[index], ...task, updatedAt: new Date() };
    mockTasks[index] = updated;
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    await delay(API_DELAY);
    const index = mockTasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    mockTasks.splice(index, 1);
    return true;
  },

  async getByStatus(status: string): Promise<Task[]> {
    await delay(API_DELAY);
    return mockTasks.filter((t) => t.status === status);
  },

  async getByAssignee(userId: string): Promise<Task[]> {
    await delay(API_DELAY);
    return mockTasks.filter((t) => t.assignedTo === userId);
  },
};

// Company Service
export const companyService = {
  async getAll(): Promise<Company[]> {
    await delay(API_DELAY);
    return mockCompanies;
  },

  async getById(id: string): Promise<Company | null> {
    await delay(API_DELAY);
    return mockCompanies.find((c) => c.id === id) || null;
  },

  async create(company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company> {
    await delay(API_DELAY);
    const newCompany: Company = {
      ...company,
      id: `comp${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockCompanies.push(newCompany);
    return newCompany;
  },

  async update(id: string, company: Partial<Company>): Promise<Company | null> {
    await delay(API_DELAY);
    const index = mockCompanies.findIndex((c) => c.id === id);
    if (index === -1) return null;
    const updated = { ...mockCompanies[index], ...company, updatedAt: new Date() };
    mockCompanies[index] = updated;
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    await delay(API_DELAY);
    const index = mockCompanies.findIndex((c) => c.id === id);
    if (index === -1) return false;
    mockCompanies.splice(index, 1);
    return true;
  },
};

// User Service
export const userService = {
  async getAll(): Promise<User[]> {
    await delay(API_DELAY);
    return mockUsers;
  },

  async getById(id: string): Promise<User | null> {
    await delay(API_DELAY);
    return mockUsers.find((u) => u.id === id) || null;
  },

  async getCurrentUser(): Promise<User> {
    await delay(API_DELAY);
    // Return first user as current user for demo
    return mockUsers[0];
  },
};

// Activity Service
export const activityService = {
  async getAll(): Promise<Activity[]> {
    await delay(API_DELAY);
    return mockActivities;
  },

  async getByContact(contactId: string): Promise<Activity[]> {
    await delay(API_DELAY);
    return mockActivities.filter((a) => a.contactId === contactId);
  },

  async create(activity: Omit<Activity, 'id'>): Promise<Activity> {
    await delay(API_DELAY);
    const newActivity: Activity = {
      ...activity,
      id: `activity${Date.now()}`,
    };
    mockActivities.push(newActivity);
    return newActivity;
  },
};

// Dashboard Service
export const dashboardService = {
  async getStats() {
    await delay(API_DELAY);
    const totalContacts = mockContacts.length;
    const activeOpportunities = mockLeads.filter((l) => l.stage !== 'closed-won' && l.stage !== 'closed-lost').length;
    const pipelineValue = mockLeads
      .filter((l) => l.stage !== 'closed-won' && l.stage !== 'closed-lost')
      .reduce((sum, l) => sum + l.amount * (l.probability / 100), 0);
    const closingThisMonth = mockLeads.filter((l) => {
      const closeDate = new Date(l.expectedCloseDate);
      const now = new Date();
      return closeDate.getMonth() === now.getMonth() && closeDate.getFullYear() === now.getFullYear();
    }).length;
    const wonDeals = mockLeads.filter((l) => l.stage === 'closed-won');
    const conversionRate = wonDeals.length > 0 ? (wonDeals.length / mockLeads.length) * 100 : 0;
    const averageDealSize = wonDeals.length > 0 ? wonDeals.reduce((sum, l) => sum + l.amount, 0) / wonDeals.length : 0;

    return {
      totalContacts,
      activeOpportunities,
      pipelineValue,
      closingThisMonth,
      conversionRate: Math.round(conversionRate),
      averageDealSize,
    };
  },
};
