import React from 'react';

interface CallLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  description: string;
  onChange: (value: string) => void;
}

const CallLogModal: React.FC<CallLogModalProps> = ({ isOpen, onClose, onSubmit, description, onChange }) => {
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
        background: '#fff',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ margin: '0 0 1.5rem 0', color: 'var(--text-primary)' }}>Log a Call</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <textarea
            placeholder="Call Notes"
            value={description}
            onChange={(e) => onChange(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              minHeight: '120px',
              resize: 'vertical',
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
              Log Call
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

export default CallLogModal;
