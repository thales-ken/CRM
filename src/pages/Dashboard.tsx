import React from 'react';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Badge from '../components/Badge';
import { mockDeals, mockContacts, mockActivities } from '../mocks/data';

const Dashboard: React.FC = () => {
  const totalRevenue = mockDeals.reduce((sum, deal) => sum + deal.value, 0);
  const wonDeals = mockDeals.filter(deal => deal.stage === 'won').length;
  const activeContacts = mockContacts.filter(contact => contact.status === 'active').length;

  const recentActivityRows = mockActivities.slice(0, 5).map(activity => [
    `${activity.type.charAt(0).toUpperCase()}${activity.type.slice(1)}`,
    activity.description,
    activity.date,
  ]);

  const topDealsRows = mockDeals
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map(deal => [
      deal.title,
      deal.company,
      `$${deal.value.toLocaleString()}`,
      `${deal.probability}%`,
      deal.stage.charAt(0).toUpperCase() + deal.stage.slice(1),
    ]);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', color: '#333' }}>Dashboard</h1>

      {/* Stats Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>
        <StatCard
          title="Total Revenue"
          value={`$${(totalRevenue / 1000).toFixed(0)}K`}
          icon="💰"
          change="+12% from last month"
          changeType="positive"
        />
        <StatCard
          title="Won Deals"
          value={wonDeals}
          icon="🎯"
          change={`${wonDeals} of ${mockDeals.length} deals`}
          changeType="positive"
        />
        <StatCard
          title="Active Contacts"
          value={activeContacts}
          icon="👥"
          change="+3 new this week"
          changeType="positive"
        />
        <StatCard
          title="Pipeline Value"
          value={`$${((mockDeals.reduce((sum, deal) => sum + (deal.value * (deal.probability / 100)), 0)) / 1000).toFixed(0)}K`}
          icon="📈"
          change="+8% from last quarter"
          changeType="positive"
        />
      </div>

      {/* Recent Activity */}
      <div style={{
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>Recent Activity</h2>
        <DataTable
          headers={['Type', 'Description', 'Date']}
          rows={recentActivityRows}
        />
      </div>

      {/* Top Deals */}
      <div style={{
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>Top Deals</h2>
        <DataTable
          headers={['Deal', 'Company', 'Value', 'Probability', 'Stage']}
          rows={topDealsRows}
        />
      </div>
    </div>
  );
};

export default Dashboard;
