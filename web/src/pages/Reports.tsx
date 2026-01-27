import React, { useState, useEffect } from 'react';
import StatCard from '../components/ui/StatCard';
import { dealsAPI, contactsAPI, activitiesAPI } from '../api/client';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('month');
  const [deals, setDeals] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dealsData, contactsData, activitiesData] = await Promise.all([
          dealsAPI.getAll(),
          contactsAPI.getAll(),
          activitiesAPI.getAll(),
        ]);
        setDeals(dealsData);
        setContacts(contactsData);
        setActivities(activitiesData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalRevenue = deals.reduce((sum: number, deal: any) => sum + deal.value, 0);
  const wonDealsValue = deals
    .filter((deal: any) => deal.stage === 'won')
    .reduce((sum: number, deal: any) => sum + deal.value, 0);
  const averageDealValue = deals.length > 0 ? (totalRevenue / deals.length).toFixed(0) : '0';
  const winRate = deals.length > 0 ? ((deals.filter((d: any) => d.stage === 'won').length / deals.length) * 100).toFixed(1) : '0';
  const avgProbability = deals.length > 0 ? (deals.reduce((sum: number, d: any) => sum + d.probability, 0) / deals.length).toFixed(0) : '0';

  const contactsByStatus = {
    active: contacts.filter((c: any) => c.status === 'active').length,
    prospect: contacts.filter((c: any) => c.status === 'prospect').length,
    inactive: contacts.filter((c: any) => c.status === 'inactive').length,
  };

  const activitiesByType = activities.reduce((acc: Record<string, number>, activity: any) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Loading reports...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '2rem', textAlign: 'center', color: '#d32f2f' }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
        <h1 style={{ margin: 0, color: 'var(--text-primary)', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>Reports & Analytics</h1>
        <div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              background: '#fff',
              color: 'var(--text-primary)',
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
          change={`+${totalRevenue > 0 ? ((wonDealsValue / totalRevenue) * 100).toFixed(0) : '0'}% of total`}
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
      <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Contact Management</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>
        <div style={{
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Contacts</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--primary)' }}>{contacts.length}</div>
        </div>
        <div style={{
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Active Contacts</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#4caf50' }}>{contactsByStatus.active}</div>
        </div>
        <div style={{
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Prospects</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#ff9800' }}>{contactsByStatus.prospect}</div>
        </div>
        <div style={{
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Inactive</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#f44336' }}>{contactsByStatus.inactive}</div>
        </div>
      </div>

      {/* Activity Breakdown */}
      <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Activity Summary</h2>
      <div style={{
        background: '#fff',
        border: '1px solid var(--border)',
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
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>{deals.length}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem' }}>Won Deals</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                {deals.filter((d: any) => d.stage === 'won').length}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem' }}>In Negotiation</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                {deals.filter((d: any) => d.stage === 'negotiation').length}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem' }}>In Proposal</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                {deals.filter((d: any) => d.stage === 'proposal').length}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem' }}>Lost Deals</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                {deals.filter((d: any) => d.stage === 'lost').length}
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
                ${(deals.reduce((sum: number, d: any) => sum + (d.value * (d.probability / 100)), 0) / 1000).toFixed(0)}K
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
