export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'prospect';
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
}

export const mockContacts: Contact[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@acme.com',
    phone: '+1 (555) 123-4567',
    company: 'ACME Corp',
    status: 'active',
    createdAt: '2025-10-15',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@techstart.io',
    phone: '+1 (555) 234-5678',
    company: 'TechStart Inc',
    status: 'active',
    createdAt: '2025-11-02',
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'mchen@globalnet.com',
    phone: '+1 (555) 345-6789',
    company: 'GlobalNet Solutions',
    status: 'prospect',
    createdAt: '2025-12-10',
  },
  {
    id: 4,
    name: 'Emma Wilson',
    email: 'emma.w@cloudvision.com',
    phone: '+1 (555) 456-7890',
    company: 'CloudVision',
    status: 'active',
    createdAt: '2026-01-05',
  },
  {
    id: 5,
    name: 'David Martinez',
    email: 'dmartinez@innovate.co',
    phone: '+1 (555) 567-8901',
    company: 'Innovate Labs',
    status: 'inactive',
    createdAt: '2025-09-20',
  },
];

export const mockDeals: Deal[] = [
  {
    id: 1,
    title: 'Enterprise License Agreement',
    company: 'ACME Corp',
    value: 150000,
    stage: 'proposal',
    probability: 75,
    closeDate: '2026-02-28',
    owner: 'You',
  },
  {
    id: 2,
    title: 'SaaS Subscription - Annual',
    company: 'TechStart Inc',
    value: 45000,
    stage: 'negotiation',
    probability: 60,
    closeDate: '2026-03-15',
    owner: 'Sarah Johnson',
  },
  {
    id: 3,
    title: 'Consulting Services',
    company: 'GlobalNet Solutions',
    value: 75000,
    stage: 'proposal',
    probability: 50,
    closeDate: '2026-04-30',
    owner: 'Michael Chen',
  },
  {
    id: 4,
    title: 'Cloud Infrastructure Setup',
    company: 'CloudVision',
    value: 120000,
    stage: 'won',
    probability: 100,
    closeDate: '2026-01-20',
    owner: 'You',
  },
  {
    id: 5,
    title: 'Product Integration',
    company: 'Innovate Labs',
    value: 35000,
    stage: 'lost',
    probability: 0,
    closeDate: '2025-12-31',
    owner: 'David Martinez',
  },
];

export const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'call',
    description: 'Discussed pricing with John Smith',
    date: '2026-01-27',
    contactId: 1,
  },
  {
    id: 2,
    type: 'email',
    description: 'Sent proposal document to Sarah Johnson',
    date: '2026-01-26',
    contactId: 2,
  },
  {
    id: 3,
    type: 'meeting',
    description: 'Q1 planning meeting with team',
    date: '2026-01-25',
  },
  {
    id: 4,
    type: 'note',
    description: 'Follow up on CloudVision deal - all systems go',
    date: '2026-01-24',
    dealId: 4,
  },
  {
    id: 5,
    type: 'call',
    description: 'Initial discovery call with Michael Chen',
    date: '2026-01-23',
    contactId: 3,
  },
];
