import React from 'react';
import FeatureCard from './FeatureCard';

interface QuickActionsProps {
  isMobile: boolean;
  onAddDeal: () => void;
  onAddContact: () => void;
  onCallLog: () => void;
  onScheduleMeeting: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  isMobile,
  onAddDeal,
  onAddContact,
  onCallLog,
  onScheduleMeeting,
}) => {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{ margin: '0 0 1.5rem 0', color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: '600' }}>
        Quick Actions
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
      }}>
        <FeatureCard
          icon="➕"
          title="Add Deal"
          description="Create a new deal and get it on the board"
          onClick={onAddDeal}
        />
        <FeatureCard
          icon="👤"
          title="Add Contact"
          description="Add a new contact to your network"
          onClick={onAddContact}
        />
        <FeatureCard
          icon="📞"
          title="Call Log"
          description="Record and log your client calls"
          onClick={onCallLog}
        />
        <FeatureCard
          icon="📅"
          title="Schedule Meeting"
          description="Set up a meeting with your team"
          onClick={onScheduleMeeting}
        />
      </div>
    </div>
  );
};

export default QuickActions;
