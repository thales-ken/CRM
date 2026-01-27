import React from 'react';

interface BadgeProps {
  label: string;
  type?: 'success' | 'warning' | 'error' | 'info' | 'processing' | 'neutral';
  icon?: string;
}

const Badge: React.FC<BadgeProps> = ({ label, type = 'info', icon }) => {
  const colors = {
    success: { bg: '#e8f5e9', color: '#2e7d32', border: '#a5d6a7' },
    warning: { bg: '#fff3e0', color: '#e65100', border: '#ffcc80' },
    error: { bg: '#ffebee', color: '#c62828', border: '#ef9a9a' },
    info: { bg: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: 'var(--border)' },
    processing: { bg: '#e3f2fd', color: '#1565c0', border: '#90caf9' },
    neutral: { bg: '#f5f5f5', color: '#616161', border: '#e0e0e0' },
  };

  const style = colors[type];

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      background: style.bg,
      color: style.color,
      padding: '0.35rem 0.85rem',
      borderRadius: '16px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'capitalize',
      border: `1px solid ${style.border}`,
      whiteSpace: 'nowrap',
    }}>
      {icon && <span style={{ fontSize: '0.9rem' }}>{icon}</span>}
      {label}
    </span>
  );
};

export default Badge;