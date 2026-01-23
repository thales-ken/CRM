// Formatting utilities
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

// Status and badge utilities
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: '#FFA500',
    'in-progress': '#0099FF',
    completed: '#00AA00',
    overdue: '#FF0000',
    'closed-won': '#00AA00',
    'closed-lost': '#FF0000',
    prospect: '#9900FF',
    qualified: '#0099FF',
    proposal: '#FFA500',
    negotiation: '#FF6600',
  };
  return colors[status] || '#999999';
};

export const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    low: '#00AA00',
    medium: '#FFA500',
    high: '#FF6600',
    urgent: '#FF0000',
  };
  return colors[priority] || '#999999';
};

// Calculation utilities
export const calculateDaysUntil = (date: Date | string): number => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const diffTime = dateObj.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const isOverdue = (date: Date | string): boolean => {
  return calculateDaysUntil(date) < 0;
};

export const getDueStatus = (date: Date | string): 'overdue' | 'today' | 'upcoming' => {
  const days = calculateDaysUntil(date);
  if (days < 0) return 'overdue';
  if (days === 0) return 'today';
  return 'upcoming';
};

// Array utilities
export const sortByDate = <T extends { createdAt: Date }>(arr: T[], desc = true): T[] => {
  return [...arr].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return desc ? timeB - timeA : timeA - timeB;
  });
};

export const groupBy = <T, K extends string | number>(arr: T[], key: (item: T) => K): Record<K, T[]> => {
  return arr.reduce(
    (result, item) => {
      const groupKey = key(item);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    },
    {} as Record<K, T[]>
  );
};

// Search utilities
export const searchFilter = <T>(items: T[], searchTerm: string, searchFields: (keyof T)[]): T[] => {
  if (!searchTerm.trim()) return items;

  const lowerSearchTerm = searchTerm.toLowerCase();

  return items.filter((item) =>
    searchFields.some((field) => {
      const value = item[field];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(lowerSearchTerm);
    })
  );
};

// Storage utilities
export const getFromStorage = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue ?? null;
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error);
    return defaultValue ?? null;
  }
};

export const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage: ${key}`, error);
  }
};
