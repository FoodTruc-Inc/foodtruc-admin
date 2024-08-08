import { useQuery } from '@tanstack/react-query';
import { QUERIES } from '@/utils/constants';
import { getAllLocations } from '@/api/locations';

export const useLocations = (page = 1) => {
  return useQuery<any>({
    queryKey: [QUERIES.USERS, page],
    queryFn: () => getAllLocations(page),
  });
};
