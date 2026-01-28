import React from 'react';

interface ContactsBulkActionsProps {
  selectedCount: number;
  totalCount: number;
  startIndex: number;
  itemsPerPage: number;
  onExport: () => void;
  onDelete: () => void;
  onAssignOwner: () => void;
  isMobile?: boolean;
}

const ContactsBulkActions: React.FC<ContactsBulkActionsProps> = ({
  selectedCount,
  totalCount,
  startIndex,
  itemsPerPage,
  onExport,
  onDelete,
  onAssignOwner,
  isMobile = false,
}) => {
  if (isMobile && selectedCount === 0) return null;

  if (isMobile) {
    return (
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
      }}>
        <button 
          onClick={onExport}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            background: '#2563eb',
            color: '#fff',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            flex: 1,
            minWidth: '100px',
          }}>
          📥 Export
        </button>
        <button 
          onClick={onDelete}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            background: '#ef4444',
            color: '#fff',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            flex: 1,
            minWidth: '100px',
          }}>
          🗑️ Delete
        </button>
        <button 
          onClick={onAssignOwner}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            background: '#2563eb',
            color: '#fff',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            flex: 1,
            minWidth: '100px',
          }}>
          👤 Assign
        </button>
      </div>
    );
  }

  // Desktop view
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
    }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span style={{ 
          fontSize: '0.8rem',
          fontWeight: '600',
          color: '#6b7280',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          BULK ACTIONS
        </span>
        <button 
          onClick={onExport}
          style={{
            padding: '0.375rem 0.75rem',
            border: 'none',
            background: 'transparent',
            color: '#2563eb',
            cursor: 'pointer',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}>
          📥 Export
        </button>
        <button 
          onClick={onDelete}
          style={{
            padding: '0.375rem 0.75rem',
            border: 'none',
            background: 'transparent',
            color: selectedCount > 0 ? '#ef4444' : '#d1d5db',
            cursor: selectedCount > 0 ? 'pointer' : 'not-allowed',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}>
          🗑️ Delete
        </button>
        <button 
          onClick={onAssignOwner}
          style={{
            padding: '0.375rem 0.75rem',
            border: 'none',
            background: 'transparent',
            color: selectedCount > 0 ? '#2563eb' : '#d1d5db',
            cursor: selectedCount > 0 ? 'pointer' : 'not-allowed',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}>
          👤 Assign Owner
        </button>
      </div>
      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalCount)} of {totalCount.toLocaleString()} contacts
      </div>
    </div>
  );
};

export default ContactsBulkActions;
