'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseLazyTableOptions {
  apiEndpoint: string;
  initialLimit?: number;
}

export function useLazyTable<T>({ apiEndpoint, initialLimit = 10 }: UseLazyTableOptions) {
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const isInitialMount = useRef(true);

  const fetchData = useCallback(async (currentPage: number, currentSearch: string, isNewSearch = false) => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: currentPage.toString(),
        limit: initialLimit.toString(),
        search: currentSearch
      });

      const response = await fetch(`${apiEndpoint}?${query}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const result = await response.json();
      
      if (isNewSearch) {
        setData(result.products);
      } else {
        setData(prev => [...prev, ...result.products]);
      }
      
      setTotal(result.total);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint, initialLimit]);

  // Initial fetch and search fetch
  useEffect(() => {
    // Small debounce for search
    const timer = setTimeout(() => {
      setPage(1);
      fetchData(1, search, true);
    }, isInitialMount.current ? 0 : 500);

    isInitialMount.current = false;
    return () => clearTimeout(timer);
  }, [search, fetchData]);

  const loadMore = () => {
    if (loading || data.length >= total) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, search, false);
  };

  const refresh = () => {
    setPage(1);
    fetchData(1, search, true);
  };

  return {
    data,
    total,
    loading,
    search,
    setSearch,
    loadMore,
    hasMore: data.length < total,
    refresh,
    error
  };
}
