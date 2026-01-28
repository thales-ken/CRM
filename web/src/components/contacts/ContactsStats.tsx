import React from 'react';

interface ContactsStatsProps {
  isMobile: boolean;
  totalContacts: number;
  activeContacts: number;
  prospectContacts: number;
  inactiveContacts: number;
}

const ContactsStats: React.FC<ContactsStatsProps> = ({
  isMobile,
  totalContacts,
  activeContacts,
  prospectContacts,
  inactiveContacts,
}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem',
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        padding: '1.5rem',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary)' }}>{totalContacts}</div>
        <div style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Contacts</div>
      </div>
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        padding: '1.5rem',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#2e7d32' }}>
          {activeContacts}
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active</div>
      </div>
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        padding: '1.5rem',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#ed6c02' }}>
          {prospectContacts}
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Prospects</div>
      </div>
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        padding: '1.5rem',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#d32f2f' }}>
          {inactiveContacts}
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Inactive</div>
      </div>
    </div>
  );
};

export default ContactsStats;
