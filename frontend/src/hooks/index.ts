import { useState, useCallback, useEffect } from 'react';

// Generic fetch hook
export const useFetch = <T,>(fetchFn: () => Promise<T>, deps: React.DependencyList = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error };
};

// Search hook
export const useSearch = <T,>(items: T[], searchFn: (item: T, query: string) => boolean) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = searchQuery.trim()
    ? items.filter((item) => searchFn(item, searchQuery.toLowerCase()))
    : items;

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
  };
};

// Filter hook
export const useFilter = <T, K extends string | number>(
  items: T[],
  filterKey: (item: T) => K,
  initialFilter?: K
) => {
  const [activeFilter, setActiveFilter] = useState<K | null>(initialFilter || null);

  const filteredItems = activeFilter
    ? items.filter((item) => filterKey(item) === activeFilter)
    : items;

  return {
    activeFilter,
    setActiveFilter,
    filteredItems,
  };
};

// Sort hook
export const useSort = <T,>(items: T[], sortKey: keyof T, initialOrder: 'asc' | 'desc' = 'asc') => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialOrder);

  const sortedItems = [...items].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSort = () => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

  return {
    sortOrder,
    sortedItems,
    toggleSort,
  };
};

// Pagination hook
export const usePagination = <T,>(items: T[], itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  const goToPage = useCallback((page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  }, [totalPages]);

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
  };
};

// Toggle hook
export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse, setValue };
};

// Local storage hook
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error writing to localStorage: ${key}`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
};

// Async state hook
export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setValue(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error as E);
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
};
