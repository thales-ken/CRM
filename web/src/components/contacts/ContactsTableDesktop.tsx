import React from 'react';
import { Contact } from '../../api/client';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';

interface ContactsTableDesktopProps {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  selectedContacts: Set<number>;
  onToggleSelection: (id: number) => void;
  onToggleAll: () => void;
  onEditContact: (contact: Contact) => void;
  getInitials: (name: string) => string;
}

const ContactsTableDesktop: React.FC<ContactsTableDesktopProps> = ({
  contacts,
  loading,
  error,
  selectedContacts,
  onToggleSelection,
  onToggleAll,
  onEditContact,
  getInitials,
}) => {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center' }}>
          <LoadingState message="Loading contacts..." />
        </div>
      ) : error ? (
        <div style={{ padding: '3rem' }}>
          <ErrorState error={error} />
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selectedContacts.size === contacts.length && contacts.length > 0}
                  onChange={onToggleAll}
                  style={{ cursor: 'pointer' }}
                />
              </th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lead Status</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Owner</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr 
                key={contact.id}
                style={{ 
                  borderBottom: index < contacts.length - 1 ? '1px solid #f3f4f6' : 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '1rem' }}>
                  <input
                    type="checkbox"
                    checked={selectedContacts.has(contact.id)}
                    onChange={() => onToggleSelection(contact.id)}
                    onClick={(e) => e.stopPropagation()}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: contact.photo ? 'transparent' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {contact.photo ? (
                        <img 
                          src={contact.photo} 
                          alt={contact.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <span style={{ color: '#fff', fontSize: '0.875rem', fontWeight: '600' }}>
                          {getInitials(contact.name)}
                        </span>
                      )}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '0.875rem' }}>
                        {contact.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {contact.email.split('@')[0]}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>
                  {contact.company}
                </td>
                <td style={{ padding: '1rem' }}>
                  <a href={`mailto:${contact.email}`} style={{ fontSize: '0.875rem', color: '#2563eb', textDecoration: 'none' }}>
                    {contact.email}
                  </a>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  {contact.phone}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.625rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    display: 'inline-block',
                    background: contact.status === 'active' 
                      ? '#d1fae5'
                      : contact.status === 'prospect'
                      ? '#fef3c7'
                      : '#e5e7eb',
                    color: contact.status === 'active'
                      ? '#065f46'
                      : contact.status === 'prospect'
                      ? '#92400e'
                      : '#374151',
                  }}>
                    • {contact.status === 'prospect' ? 'New Lead' : contact.status === 'active' ? 'Qualified' : contact.status === 'inactive' ? 'Cold' : 'Negotiation'}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#e0e7ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.625rem',
                      fontWeight: '600',
                      color: '#4338ca',
                    }}>
                      AT
                    </div>
                    <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                      Alex Thompson
                    </span>
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => onEditContact(contact)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.125rem',
                        color: '#6b7280',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '4px',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      ⋮
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactsTableDesktop;
