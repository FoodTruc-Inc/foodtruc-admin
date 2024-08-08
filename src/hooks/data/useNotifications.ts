import { useQuery } from '@tanstack/react-query';
import { QUERY_PATHS } from '../../utils/constants';
import { getNotifications } from '../../api/users';

export const useNotifications = () => {
  return useQuery({
    queryKey: [QUERY_PATHS.NOTIFICATIONS],
    queryFn: () => getNotifications(),
  });
};
