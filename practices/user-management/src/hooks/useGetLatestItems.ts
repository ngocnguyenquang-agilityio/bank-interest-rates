import useSWR from 'swr';

// Services
import { fetcher } from '@/services/fetcher';

// Constants
import { LIMIT_DEFAULT } from '@/constants/pagination';

export const useGetLatestItems = (endpoint: string) => {
  const { data, isLoading } = useSWR(`${endpoint}?orderBy=id&order=desc&p=1&limit=${LIMIT_DEFAULT}`, fetcher);
  if (!isLoading) return data;
};
