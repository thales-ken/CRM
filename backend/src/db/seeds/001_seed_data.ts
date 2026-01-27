import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('activities').del();
  await knex('deals').del();
  await knex('contacts').del();

  // Inserts seed entries
  const contactIds = await knex('contacts').insert([
    {
      name: 'John Smith',
      email: 'john.smith@acme.com',
      phone: '+1 (555) 123-4567',
      company: 'ACME Corp',
      status: 'active',
      createdAt: '2025-10-15',
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah.j@techstart.io',
      phone: '+1 (555) 234-5678',
      company: 'TechStart Inc',
      status: 'active',
      createdAt: '2025-11-02',
    },
    {
      name: 'Michael Chen',
      email: 'mchen@globalnet.com',
      phone: '+1 (555) 345-6789',
      company: 'GlobalNet Solutions',
      status: 'prospect',
      createdAt: '2025-12-10',
    },
    {
      name: 'Emma Wilson',
      email: 'emma.w@cloudvision.com',
      phone: '+1 (555) 456-7890',
      company: 'CloudVision',
      status: 'active',
      createdAt: '2026-01-05',
    },
    {
      name: 'David Martinez',
      email: 'dmartinez@innovate.co',
      phone: '+1 (555) 567-8901',
      company: 'Innovate Labs',
      status: 'inactive',
      createdAt: '2025-09-20',
    },
  ]);

  const dealIds = await knex('deals').insert([
    {
      title: 'Enterprise License Agreement',
      company: 'ACME Corp',
      value: 150000,
      stage: 'proposal',
      probability: 75,
      closeDate: '2026-02-28',
      owner: 'You',
    },
    {
      title: 'SaaS Subscription - Annual',
      company: 'TechStart Inc',
      value: 45000,
      stage: 'negotiation',
      probability: 60,
      closeDate: '2026-03-15',
      owner: 'Sarah Johnson',
    },
    {
      title: 'Consulting Services',
      company: 'GlobalNet Solutions',
      value: 75000,
      stage: 'proposal',
      probability: 50,
      closeDate: '2026-04-30',
      owner: 'Michael Chen',
    },
    {
      title: 'Cloud Infrastructure Setup',
      company: 'CloudVision',
      value: 120000,
      stage: 'won',
      probability: 100,
      closeDate: '2026-01-20',
      owner: 'You',
    },
    {
      title: 'Product Integration',
      company: 'Innovate Labs',
      value: 35000,
      stage: 'lost',
      probability: 0,
      closeDate: '2025-12-31',
      owner: 'David Martinez',
    },
  ]);

  await knex('activities').insert([
    {
      type: 'call',
      description: 'Discussed pricing with John Smith',
      date: '2026-01-27',
      contactId: contactIds[0],
    },
    {
      type: 'email',
      description: 'Sent proposal document to Sarah Johnson',
      date: '2026-01-26',
      contactId: contactIds[1],
    },
    {
      type: 'meeting',
      description: 'Q1 planning meeting with team',
      date: '2026-01-25',
    },
    {
      type: 'note',
      description: 'Follow up on GlobalNet proposal next week',
      date: '2026-01-24',
      contactId: contactIds[2],
      dealId: dealIds[2],
    },
    {
      type: 'call',
      description: 'Closed deal with CloudVision',
      date: '2026-01-20',
      contactId: contactIds[3],
      dealId: dealIds[3],
    },
  ]);
}
