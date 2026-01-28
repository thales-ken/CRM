import React from 'react';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  contact: {
    name: string;
    email: string;
    phone: string;
    company: string;
    photo: string;
  };
  onChange: (contact: AddContactModalProps['contact']) => void;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing?: boolean;
}

const AddContactModal: React.FC<AddContactModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  contact, 
  onChange, 
  onPhotoUpload,
  isEditing = false,
}) => {
  if (!isOpen) return null;

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
        background: 'var(--bg-secondary)',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ margin: '0 0 1.5rem 0', color: 'var(--text-primary)' }}>
          {isEditing ? 'Edit Contact' : 'Add New Contact'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Photo Preview */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid var(--border)',
              background: 'var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {contact.photo ? (
                <img 
                  src={contact.photo} 
                  alt="Contact preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: '2rem', color: 'var(--text-secondary)' }}>👤</span>
              )}
            </div>
          </div>
          
          {/* Photo Upload */}
          <label style={{
            padding: '0.75rem',
            border: '2px dashed var(--border)',
            borderRadius: '8px',
            textAlign: 'center',
            cursor: 'pointer',
            background: 'var(--bg-secondary)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <input
              type="file"
              accept="image/*"
              onChange={onPhotoUpload}
              style={{ display: 'none' }}
            />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              📷 {contact.photo ? 'Change Photo' : 'Upload Photo'} (Max 2MB)
            </span>
          </label>

          <input
            type="text"
            placeholder="Full Name"
            value={contact.name}
            onChange={(e) => onChange({ ...contact, name: e.target.value })}
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => onChange({ ...contact, email: e.target.value })}
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={contact.phone}
            onChange={(e) => onChange({ ...contact, phone: e.target.value })}
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
          <input
            type="text"
            placeholder="Company"
            value={contact.company}
            onChange={(e) => onChange({ ...contact, company: e.target.value })}
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={onSubmit}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              {isEditing ? 'Update Contact' : 'Add Contact'}
            </button>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                background: 'var(--border)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;
