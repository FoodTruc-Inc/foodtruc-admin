import { useQuery } from '@tanstack/react-query';
import { QUERIES } from '@/utils/constants';
import { getAllUsers } from '@/api/users';

export const useUsers = (page = 1) => {
  return useQuery<any>({
    queryKey: [QUERIES.USERS, page],
    queryFn: () => getAllUsers(page),
  });
};
