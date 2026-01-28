import React from 'react';
import { Contact } from '../../api/client';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';

interface ContactsListMobileProps {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  selectedContacts: Set<number>;
  onToggleSelection: (id: number) => void;
  onEditContact: (contact: Contact) => void;
  getInitials: (name: string) => string;
}

const ContactsListMobile: React.FC<ContactsListMobileProps> = ({
  contacts,
  loading,
  error,
  selectedContacts,
  onToggleSelection,
  onEditContact,
  getInitials,
}) => {
  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <LoadingState message="Loading contacts..." />
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (contacts.length === 0) {
    return (
      <div style={{
        padding: '3rem 1rem',
        textAlign: 'center',
        color: '#9ca3af',
      }}>
        No contacts found
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          style={{
            background: 'var(--bg-secondary)',
            borderRadius: '16px',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            border: '1px solid var(--border)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-secondary)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-secondary)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={selectedContacts.has(contact.id)}
            onChange={() => onToggleSelection(contact.id)}
            onClick={(e) => e.stopPropagation()}
            style={{ cursor: 'pointer', width: '18px', height: '18px' }}
          />

          {/* Avatar */}
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            background: contact.photo ? 'transparent' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--border)',
          }}>
            {contact.photo ? (
              <img 
                src={contact.photo} 
                alt={contact.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ color: '#fff', fontSize: '1rem', fontWeight: '600' }}>
                {getInitials(contact.name)}
              </span>
            )}
          </div>

          {/* Contact Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '0.25rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {contact.name}
            </div>
            <div style={{
              color: '#6b7280',
              fontSize: '0.85rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {contact.company}
            </div>
          </div>

          {/* Status Badge */}
          <span style={{
            padding: '0.25rem 0.625rem',
            borderRadius: '12px',
            fontSize: '0.7rem',
            fontWeight: '500',
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
            whiteSpace: 'nowrap',
          }}>
            {contact.status === 'prospect' ? 'Lead' : contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
          </span>

          {/* Actions Menu */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditContact(contact);
            }}
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
              width: '28px',
              height: '28px',
              borderRadius: '4px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            ⋮
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactsListMobile;
