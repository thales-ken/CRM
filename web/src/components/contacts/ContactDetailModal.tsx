import React from 'react';
import Badge from '../ui/Badge';
import { Contact } from '../../api/client';

interface ContactDetailModalProps {
  contact: Contact | null;
  onClose: () => void;
  getStatusType: (status: string) => 'success' | 'warning' | 'error' | 'info';
}

const ContactDetailModal: React.FC<ContactDetailModalProps> = ({ contact, onClose, getStatusType }) => {
  if (!contact) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>{contact.name}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* Contact Photo */}
        {contact.photo && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid var(--primary)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}>
              <img 
                src={contact.photo} 
                alt={contact.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <strong>Email:</strong> {contact.email}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Phone:</strong> {contact.phone}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Company:</strong> {contact.company}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Status:</strong> <Badge label={contact.status} type={getStatusType(contact.status)} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Created:</strong> {contact.createdAt}
        </div>
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ContactDetailModal;
