// Contact Types
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  category: 'prospect' | 'customer' | 'vendor' | 'partner';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// Lead Types
export type LeadStage = 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';

export interface Lead {
  id: string;
  title: string;
  contactId: string;
  companyId: string;
  amount: number;
  currency: string;
  stage: LeadStage;
  probability: number; // 0-100
  expectedCloseDate: Date;
  source: 'website' | 'referral' | 'email' | 'phone' | 'event' | 'social';
  description: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}

// Task Types
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  assignedTo: string;
  relatedContact?: string;
  relatedLead?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Company/Account Types
export interface Company {
  id: string;
  name: string;
  website: string;
  industry: string;
  employees: number;
  revenue?: number;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Types
export type UserRole = 'admin' | 'manager' | 'sales-rep' | 'viewer';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

// Activity Types
export type ActivityType = 'call' | 'email' | 'meeting' | 'note';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  contactId: string;
  createdBy: string;
  createdAt: Date;
}

// Dashboard Types
export interface DashboardStats {
  totalContacts: number;
  activeOpportunities: number;
  pipelineValue: number;
  closingThisMonth: number;
  conversionRate: number;
  averageDealSize: number;
}
