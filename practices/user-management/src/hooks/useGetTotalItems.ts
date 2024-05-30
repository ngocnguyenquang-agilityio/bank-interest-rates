import useSWR from 'swr';

// Services
import { fetcher } from '@/services/fetcher';

export const useGetTotalItems = (endpoint: string) => {
  const { data, isLoading } = useSWR(endpoint, fetcher);
  if (!isLoading) return data.length;
};
