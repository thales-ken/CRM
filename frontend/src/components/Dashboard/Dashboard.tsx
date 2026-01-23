import React from 'react';
import './Dashboard.css';
import { dashboardService } from '../../services/api';
import { useFetch } from '../../hooks';
import { formatCurrency } from '../../utils/helpers';

export const Dashboard: React.FC = () => {
  const { data: stats, loading } = useFetch(() => dashboardService.getStats());

  if (loading) return <div className="p-8">Loading...</div>;
  if (!stats) return <div className="p-8">Error loading dashboard</div>;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="stat-cards-grid">
        <StatCard
          title="Total Contacts"
          value={stats.totalContacts}
          icon="👥"
        />
        <StatCard
          title="Active Opportunities"
          value={stats.activeOpportunities}
          icon="🎯"
        />
        <StatCard
          title="Pipeline Value"
          value={formatCurrency(stats.pipelineValue)}
          icon="💰"
        />
        <StatCard
          title="Closing This Month"
          value={stats.closingThisMonth}
          icon="📅"
        />
      </div>

      <div className="metric-cards-grid">
        <MetricCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          trend="up"
        />
        <MetricCard
          title="Average Deal Size"
          value={formatCurrency(stats.averageDealSize)}
          trend="up"
        />
      </div>

      <div className="activity-card">
        <h2 className="activity-title">Recent Activity</h2>
        <p className="activity-empty">No recent activities. Start creating leads and tasks!</p>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <div className="stat-label">{title}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  trend: 'up' | 'down';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend }) => {
  return (
    <div className={`metric-card metric-${trend}`}>
      <div className="metric-label">{title}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-trend">{trend === 'up' ? '↑' : '↓'} Trend</div>
    </div>
  );
};
