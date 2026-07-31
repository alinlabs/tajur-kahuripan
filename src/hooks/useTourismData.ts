import { useState, useEffect } from 'react';
import { TourismData } from '../types';

let cachedData: TourismData | null = null;

export function useTourismData() {
  const [data, setData] = useState<TourismData | null>(cachedData);
  const [isLoading, setIsLoading] = useState<boolean>(!cachedData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedData) {
      return;
    }

    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch('/data/tourism_data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: TourismData = await response.json();
        cachedData = jsonData;
        setData(jsonData);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load tourism data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}
