import React from 'react';

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  meeting: {
    title: string;
    date: string;
    attendees: string;
  };
  onChange: (meeting: ScheduleMeetingModalProps['meeting']) => void;
}

const ScheduleMeetingModal: React.FC<ScheduleMeetingModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  meeting, 
  onChange 
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
        background: '#fff',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ margin: '0 0 1.5rem 0', color: 'var(--text-primary)' }}>Schedule a Meeting</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Meeting Title"
            value={meeting.title}
            onChange={(e) => onChange({ ...meeting, title: e.target.value })}
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
          <input
            type="date"
            value={meeting.date}
            onChange={(e) => onChange({ ...meeting, date: e.target.value })}
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
            placeholder="Attendees"
            value={meeting.attendees}
            onChange={(e) => onChange({ ...meeting, attendees: e.target.value })}
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
              Schedule
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

export default ScheduleMeetingModal;
