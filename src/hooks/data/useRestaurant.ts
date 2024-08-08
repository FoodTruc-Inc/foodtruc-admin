import { useQuery } from '@tanstack/react-query';
import { QUERY_PATHS } from '../../utils/constants';
import {
  getRestaurants,
  getRestaurant,
  getFavorites,
  getCuisines,
  getBusinessReviews,
  getUserReviews,
  getBusinessReviewsCount,
  getBusiness,
} from '../../api/restaurant';

export const useRestaurants = ({
  category,
  q,
  disable,
  status,
}: {
  category?: string;
  q?: string;
  disable?: boolean;
  status?: string;
}) => {
  return useQuery({
    queryKey: [QUERY_PATHS.RESTAURANTS, category, q],
    queryFn: () =>
      getRestaurants({
        category,
        q,
        status,
      }),
    enabled: !disable,
  });
};

export const useRestaurant = (id?: string) => {
  return useQuery({
    queryKey: [QUERY_PATHS.RESTAURANTS, id],
    queryFn: () => getRestaurant(id),
    enabled: !!id,
  });
};
export const useBusiness = (id?: string) => {
  return useQuery({
    queryKey: [QUERY_PATHS.RESTAURANTS, 'e', id],
    queryFn: () => getBusiness(id),
    enabled: !!id,
  });
};

export const useFavorites = () => {
  return useQuery({
    queryKey: [QUERY_PATHS.FAVORITES],
    queryFn: () => getFavorites(),
  });
};

export const useCuisines = () => {
  return useQuery({
    queryKey: [QUERY_PATHS.CUISINES],
    queryFn: () => getCuisines(),
  });
};

export const useBusinessReviews = (businessId: string, rating?: number) => {
  return useQuery({
    queryKey: [QUERY_PATHS.BUSINESS_REVIEWS, businessId, rating],
    queryFn: () => getBusinessReviews(businessId, rating),
  });
};
export const useBusinessReviewsCount = (businessId: string) => {
  return useQuery({
    queryKey: [QUERY_PATHS.BUSINESS_REVIEWS_COUNT, businessId],
    queryFn: () => getBusinessReviewsCount(businessId),
  });
};

export const useUserReviews = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_PATHS.USER_REVIEWS, userId],
    queryFn: () => getUserReviews(userId),
  });
};
