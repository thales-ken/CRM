import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '1.5rem',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}
    onMouseEnter={(e) => {
      if (onClick) {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
      }
    }}
    onMouseLeave={(e) => {
      if (onClick) {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }
    }}
  >
    <div style={{ fontSize: '2.5rem' }}>{icon}</div>
    <div>
      <h3 style={{
        margin: '0 0 0.5rem 0',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        fontWeight: '600',
      }}>
        {title}
      </h3>
      <p style={{
        margin: '0',
        color: 'var(--text-secondary)',
        fontSize: '0.875rem',
        lineHeight: '1.5',
      }}>
        {description}
      </p>
    </div>
  </div>
);

export default FeatureCard;