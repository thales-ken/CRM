import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actionButton }) => {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '700' }}>
            {title}
          </h1>
          <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            {subtitle}
          </p>
        </div>
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(67, 84, 86, 0.3)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            {actionButton.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;