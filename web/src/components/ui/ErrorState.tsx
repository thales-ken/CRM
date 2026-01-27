import React from 'react';

interface ErrorStateProps {
  error: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div style={{ padding: '1rem', background: '#ffebee', color: '#d32f2f', borderRadius: '8px', marginBottom: '2rem' }}>
      Error: {error}
    </div>
  );
};

export default ErrorState;