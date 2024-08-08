import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/api/orders';
import { QUERIES } from '@/utils';

export const useOrders = (
  status: 'all' | 'active' | 'completed' | 'cancelled',
  page = 1
) => {
  return useQuery({
    queryKey: [QUERIES.ORDERS, status, page],
    queryFn: () => getOrders(status, page),
  });
};
