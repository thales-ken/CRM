import React from 'react';

interface AddDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  deal: {
    title: string;
    company: string;
    value: number;
    stage: 'negotiation' | 'proposal' | 'won' | 'lost';
    probability: number;
  };
  onChange: (deal: AddDealModalProps['deal']) => void;
}

const AddDealModal: React.FC<AddDealModalProps> = ({ isOpen, onClose, onSubmit, deal, onChange }) => {
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
        <h2 style={{ margin: '0 0 1.5rem 0', color: 'var(--text-primary)' }}>Add New Deal</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Deal Title"
            value={deal.title}
            onChange={(e) => onChange({ ...deal, title: e.target.value })}
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
            value={deal.company}
            onChange={(e) => onChange({ ...deal, company: e.target.value })}
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
          <input
            type="number"
            placeholder="Deal Value"
            value={deal.value}
            onChange={(e) => onChange({ ...deal, value: parseFloat(e.target.value) })}
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
          <select
            value={deal.stage}
            onChange={(e) => onChange({ ...deal, stage: e.target.value as 'negotiation' | 'proposal' | 'won' | 'lost' })}
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          >
            <option value="negotiation">Negotiation</option>
            <option value="proposal">Proposal</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          <input
            type="number"
            placeholder="Probability %"
            min="0"
            max="100"
            value={deal.probability}
            onChange={(e) => onChange({ ...deal, probability: parseInt(e.target.value) })}
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
              Add Deal
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

export default AddDealModal;
