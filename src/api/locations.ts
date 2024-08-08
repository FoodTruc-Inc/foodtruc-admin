import { processUrlVariables, QUERIES } from '@/utils';
import { apiClient } from './init';

export const getAllLocations = async (page = 1) => {
  const { data } = await apiClient.get(
    processUrlVariables(QUERIES.LOCATIONS, {
      query: {
        page,
      },
    })
  );

  return data;
};

export const createLocation = async (data: any) => {
  const { data: location } = await apiClient.post('/locations', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return location;
};
