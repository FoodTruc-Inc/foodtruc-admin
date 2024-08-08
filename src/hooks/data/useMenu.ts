import { useQuery } from '@tanstack/react-query';
import { QUERY_PATHS } from '../../utils/constants';
import { getMenus } from '../../api/menu';

export const useMenuItems = (id: string, category: string) => {
  return useQuery({
    queryKey: [QUERY_PATHS.GET_MENU_ITEMS, id, category],
    queryFn: () => getMenus({ id, category }),
    enabled: !!id && !!category,
  });
};
