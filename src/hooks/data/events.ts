import { useQuery } from '@tanstack/react-query';
import { QUERIES } from '@/utils/constants';
import { getEvents } from '@/api/events';

export const useEvents = ({
  status,
  limit = 10,
  page = 1,
}: {
  status: 'all' | 'unassigned' | 'current' | 'past';
  limit?: number;
  page?: number;
}) => {
  return useQuery({
    queryKey: [QUERIES.EVENTS, status, limit, page],
    queryFn: () =>
      getEvents({
        status,
        limit,
        page,
      }),
  });
};
