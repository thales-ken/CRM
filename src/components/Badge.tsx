import React from 'react';

interface BadgeProps {
  label: string;
  type?: 'success' | 'warning' | 'error' | 'info';
}

const Badge: React.FC<BadgeProps> = ({ label, type = 'info' }) => {
  const colors = {
    success: { bg: '#e8f5e9', color: '#2e7d32' },
    warning: { bg: '#fff3e0', color: '#e65100' },
    error: { bg: '#ffebee', color: '#c62828' },
    info: { bg: '#e3f2fd', color: '#1565c0' },
  };

  const style = colors[type];

  return (
    <span style={{
      display: 'inline-block',
      background: style.bg,
      color: style.color,
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'capitalize',
    }}>
      {label}
    </span>
  );
};

export default Badge;
