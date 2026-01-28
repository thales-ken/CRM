import React from 'react';

type FilterType = 'all' | 'active' | 'lead' | 'inactive';

interface ContactsFilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  isMobile?: boolean;
}

const ContactsFilterButtons: React.FC<ContactsFilterButtonsProps> = ({ 
  activeFilter, 
  onFilterChange,
  isMobile = false 
}) => {
  const filters: FilterType[] = ['all', 'active', 'lead', 'inactive'];

  return (
    <div style={{
      display: 'flex',
      gap: '0.75rem',
      marginBottom: isMobile ? '2rem' : '0',
      overflowX: isMobile ? 'auto' : 'visible',
      paddingBottom: isMobile ? '0.5rem' : '0',
    }}>
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          style={{
            padding: isMobile ? '0.625rem 1.5rem' : '0.625rem 1.5rem',
            borderRadius: '24px',
            border: activeFilter === filter ? 'none' : '1px solid var(--border)',
            background: activeFilter === filter ? '#2563eb' : 'var(--bg-secondary)',
            color: activeFilter === filter ? '#fff' : '#6b7280',
            fontSize: isMobile ? '0.9rem' : '0.875rem',
            fontWeight: activeFilter === filter ? '500' : '400',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
          }}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1) + (filter === 'lead' ? 's' : '')}
        </button>
      ))}
    </div>
  );
};

export default ContactsFilterButtons;
