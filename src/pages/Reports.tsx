import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import { mockDeals, mockContacts, mockActivities } from '../mocks/data';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('month');

  const totalRevenue = mockDeals.reduce((sum, deal) => sum + deal.value, 0);
  const wonDealsValue = mockDeals
    .filter(deal => deal.stage === 'won')
    .reduce((sum, deal) => sum + deal.value, 0);
  const lostDealsValue = mockDeals
    .filter(deal => deal.stage === 'lost')
    .reduce((sum, deal) => sum + deal.value, 0);
  const averageDealValue = (totalRevenue / mockDeals.length).toFixed(0);
  const winRate = ((mockDeals.filter(d => d.stage === 'won').length / mockDeals.length) * 100).toFixed(1);
  const avgProbability = (mockDeals.reduce((sum, d) => sum + d.probability, 0) / mockDeals.length).toFixed(0);

  const contactsByStatus = {
    active: mockContacts.filter(c => c.status === 'active').length,
    prospect: mockContacts.filter(c => c.status === 'prospect').length,
    inactive: mockContacts.filter(c => c.status === 'inactive').length,
  };

  const activitiesByType = mockActivities.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#333' }}>Reports & Analytics</h1>
        <div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
              fontSize: '1rem',
            }}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <h2 style={{ color: '#333', marginTop: '2rem', marginBottom: '1rem' }}>Sales Performance</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>
        <StatCard
          title="Total Pipeline"
          value={`$${(totalRevenue / 1000).toFixed(0)}K`}
          icon="💰"
          change="+$25K from last period"
          changeType="positive"
        />
        <StatCard
          title="Won Deals"
          value={`$${(wonDealsValue / 1000).toFixed(0)}K`}
          icon="🎯"
          change={`+${((wonDealsValue / totalRevenue) * 100).toFixed(0)}% of total`}
          changeType="positive"
        />
        <StatCard
          title="Average Deal Size"
          value={`$${(parseInt(averageDealValue) / 1000).toFixed(0)}K`}
          icon="📊"
          change="+$5K from last month"
          changeType="positive"
        />
        <StatCard
          title="Win Rate"
          value={`${winRate}%`}
          icon="📈"
          change="+2.5% improvement"
          changeType="positive"
        />
      </div>

      {/* Contact Metrics */}
      <h2 style={{ color: '#333', marginTop: '2rem', marginBottom: '1rem' }}>Contact Management</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>
        <div style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>Total Contacts</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1976d2' }}>{mockContacts.length}</div>
        </div>
        <div style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>Active Contacts</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#4caf50' }}>{contactsByStatus.active}</div>
        </div>
        <div style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>Prospects</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#ff9800' }}>{contactsByStatus.prospect}</div>
        </div>
        <div style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>Inactive</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#f44336' }}>{contactsByStatus.inactive}</div>
        </div>
      </div>

      {/* Activity Breakdown */}
      <h2 style={{ color: '#333', marginTop: '2rem', marginBottom: '1rem' }}>Activity Summary</h2>
      <div style={{
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
        }}>
          {Object.entries(activitiesByType).map(([type, count]) => (
            <div key={type} style={{
              padding: '1rem',
              background: '#f5f5f5',
              borderRadius: '4px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1976d2' }}>{count}</div>
              <div style={{ fontSize: '0.875rem', color: '#666', textTransform: 'capitalize' }}>{type}s</div>
            </div>
          ))}
        </div>
      </div>

      {/* Deal Analysis */}
      <h2 style={{ color: '#333', marginTop: '2rem', marginBottom: '1rem' }}>Deal Analysis</h2>
      <div style={{
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}>
          <thead>
            <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Metric</th>
              <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem' }}>Total Deals</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>{mockDeals.length}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem' }}>Won Deals</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                {mockDeals.filter(d => d.stage === 'won').length}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem' }}>In Negotiation</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                {mockDeals.filter(d => d.stage === 'negotiation').length}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem' }}>In Proposal</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                {mockDeals.filter(d => d.stage === 'proposal').length}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem' }}>Lost Deals</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                {mockDeals.filter(d => d.stage === 'lost').length}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem' }}>Average Probability</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>{avgProbability}%</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem' }}>Total Pipeline Value</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                ${(totalRevenue / 1000).toFixed(0)}K
              </td>
            </tr>
            <tr>
              <td style={{ padding: '1rem' }}>Expected Revenue (Weighted)</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                ${(mockDeals.reduce((sum, d) => sum + (d.value * (d.probability / 100)), 0) / 1000).toFixed(0)}K
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
