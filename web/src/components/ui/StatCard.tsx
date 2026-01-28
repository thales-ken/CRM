import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeType = 'neutral',
  description 
}) => (
  <div style={{
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: 'clamp(1rem, 2vw, 1.5rem)',
    minWidth: '0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'box-shadow 0.2s, border-color 0.2s',
    cursor: 'pointer',
  }}
  onMouseEnter={(e) => {
    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
    (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)';
  }}
  onMouseLeave={(e) => {
    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
  }}
  >
    {icon && (
      <div style={{ 
        fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', 
        marginBottom: '1rem',
        opacity: 0.8,
      }}>
        {icon}
      </div>
    )}
    <div style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      {title}
    </div>
    <div style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: '700', color: 'var(--primary)', marginBottom: description ? '0.5rem' : '0' }}>
      {value}
    </div>
    {description && (
      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: '1.4' }}>
        {description}
      </div>
    )}
    {change && (
      <div style={{
        fontSize: '0.8rem',
        fontWeight: '600',
        color: changeType === 'positive' ? '#2e7d32' : changeType === 'negative' ? '#c62828' : 'var(--text-secondary)',
        marginTop: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
      }}>
        <span style={{ fontSize: '1rem' }}>
          {changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : '→'}
        </span>
        {change}
      </div>
    )}
  </div>
);

export default StatCard;