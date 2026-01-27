import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: '#fff',
        color: 'var(--text-primary)',
        padding: '0',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        zIndex: 2000,
        animation: 'slideIn 0.3s ease-out',
        maxWidth: '420px',
        minWidth: '320px',
        overflow: 'hidden',
        border: `3px solid ${type === 'success' ? '#4caf50' : '#f44336'}`,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1.25rem 1.5rem',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: type === 'success' ? '#4caf50' : '#f44336',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: '#fff',
            flexShrink: 0,
          }}>
            {type === 'success' ? '✓' : '✕'}
          </div>
          <span style={{
            fontSize: '1rem',
            fontWeight: '500',
            lineHeight: '1.4',
          }}>
            {message}
          </span>
        </div>
        <div style={{
          height: '4px',
          background: '#e0e0e0',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            background: type === 'success' ? '#4caf50' : '#f44336',
            animation: 'countdown 3s linear',
            transformOrigin: 'left',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(500px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes countdown {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Toast;