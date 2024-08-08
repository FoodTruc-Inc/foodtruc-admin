import { QUERIES } from '@/utils';
import { apiClient } from './init';

export const getOrders = async (
  status: 'all' | 'active' | 'completed' | 'cancelled',
  page = 1
) => {
  const { data } = await apiClient.get(QUERIES.ORDERS, {
    params: {
      status,
      page,
    },
  });

  return data || [];
};
