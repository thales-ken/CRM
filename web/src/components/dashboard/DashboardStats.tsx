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
  previousRevenue?: number;
  previousWonDeals?: number;
  previousActiveContacts?: number;
  previousAvgDealValue?: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  isMobile,
  totalRevenue,
  wonDeals,
  totalDeals,
  activeContacts,
  totalContacts,
  avgDealValue,
  previousRevenue = 0,
  previousWonDeals = 0,
  previousActiveContacts = 0,
  previousAvgDealValue = 0,
}) => {
  // Calculate percentage changes based on previous data
  const revenueChange = previousRevenue > 0 ? (((totalRevenue - previousRevenue) / previousRevenue) * 100).toFixed(0) : '0';
  const dealsChange = previousWonDeals > 0 ? (wonDeals - previousWonDeals) : 0;
  const contactsChange = previousActiveContacts > 0 ? (activeContacts - previousActiveContacts) : 0;
  const dealValueChange = previousAvgDealValue > 0 ? (((avgDealValue - previousAvgDealValue) / previousAvgDealValue) * 100).toFixed(0) : '0';

  const isRevenuePositive = parseInt(revenueChange) >= 0;
  const isDealsPositive = dealsChange >= 0;
  const isContactsPositive = contactsChange >= 0;
  const isDealValuePositive = parseInt(dealValueChange) >= 0;

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
        change={`${isRevenuePositive ? '+' : ''}${revenueChange}% from previous period`}
        changeType={isRevenuePositive ? "positive" : "negative"}
      />
      <StatCard
        title="Won Deals"
        value={wonDeals}
        icon="🎯"
        description={`out of ${totalDeals} total`}
        change={`${isDealsPositive ? '+' : ''}${dealsChange} from previous period`}
        changeType={isDealsPositive ? "positive" : "negative"}
      />
      <StatCard
        title="Active Contacts"
        value={activeContacts}
        icon="👥"
        description={`${totalContacts - activeContacts} inactive`}
        change={`${isContactsPositive ? '+' : ''}${contactsChange} from previous period`}
        changeType={isContactsPositive ? "positive" : "negative"}
      />
      <StatCard
        title="Avg Deal Value"
        value={`$${avgDealValue.toLocaleString()}`}
        icon="📊"
        description="across pipeline"
        change={`${isDealValuePositive ? '+' : ''}${dealValueChange}% change`}
        changeType={isDealValuePositive ? "positive" : "negative"}
      />
    </div>
  );
};

export default DashboardStats;
