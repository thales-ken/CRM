import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, changeType = 'neutral' }) => (
  <div style={{
    background: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '1.5rem',
    minWidth: '200px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  }}>
    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
    <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>{title}</div>
    <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1976d2' }}>{value}</div>
    {change && (
      <div style={{
        fontSize: '0.75rem',
        color: changeType === 'positive' ? '#4caf50' : changeType === 'negative' ? '#f44336' : '#666',
        marginTop: '0.5rem',
      }}>
        {changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : '→'} {change}
      </div>
    )}
  </div>
);

export default StatCard;
