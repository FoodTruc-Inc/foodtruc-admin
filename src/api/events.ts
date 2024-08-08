import { QUERIES } from '@/utils';
import { apiClient } from './init';

export const getEvents = async ({
  status,
  limit = 10,
  page = 1,
}: {
  status: 'all' | 'unassigned' | 'current' | 'past';
  limit?: number;
  page?: number;
}) => {
  const { data } = await apiClient.get(QUERIES.EVENTS, {
    params: {
      status,
      page,
      limit,
    },
  });

  return data || [];
};
