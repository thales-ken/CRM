type BadgeType = 'success' | 'warning' | 'error' | 'info';

export const getStatusBadgeType = (status: string): BadgeType => {
  if (status === 'active') return 'success';
  if (status === 'prospect') return 'warning';
  return 'error';
};

export const getStageBadgeType = (stage: string): BadgeType => {
  if (stage === 'won') return 'success';
  if (stage === 'lost') return 'error';
  if (stage === 'proposal') return 'warning';
  return 'info';
};
