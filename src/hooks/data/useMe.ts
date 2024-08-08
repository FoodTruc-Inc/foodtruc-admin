import { QueryOptions, useQuery } from '@tanstack/react-query';
import { QUERIES } from '@/utils';
import { getUser } from '@/api/auth';

export const useMe = (option?: QueryOptions) => {
  return useQuery<any>({
    queryKey: [QUERIES.ME],
    queryFn: () => getUser(),
    ...(option || {}),
  });
};
