import React from 'react';
import StatCard from '../ui/StatCard';

interface DashboardStatsProps {
  isMobile: boolean;
  totalRevenue: number;
  wonDeals: number;
  totalDeals: number;
  activeContacts: number;
  totalContacts: number;
  avgDealValue: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  isMobile,
  totalRevenue,
  wonDeals,
  totalDeals,
  activeContacts,
  totalContacts,
  avgDealValue,
}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem',
    }}>
      <StatCard
        title="Total Revenue"
        value={`$${(totalRevenue / 1000).toFixed(0)}K`}
        icon="💰"
        description="from all deals"
        change="+12% from last month"
        changeType="positive"
      />
      <StatCard
        title="Won Deals"
        value={wonDeals}
        icon="🎯"
        description={`out of ${totalDeals} total`}
        change="+3 this month"
        changeType="positive"
      />
      <StatCard
        title="Active Contacts"
        value={activeContacts}
        icon="👥"
        description={`${totalContacts - activeContacts} inactive`}
        change="+2 new contacts"
        changeType="positive"
      />
      <StatCard
        title="Avg Deal Value"
        value={`$${avgDealValue.toLocaleString()}`}
        icon="📊"
        description="across pipeline"
        change="+5% increase"
        changeType="positive"
      />
    </div>
  );
};

export default DashboardStats;
