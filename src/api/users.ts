import { processUrlVariables, QUERIES } from '@/utils';
import { apiClient } from './init';

export const getAllUsers = async (page = 1) => {
  const { data } = await apiClient.get(
    processUrlVariables(QUERIES.USERS, {
      query: {
        page,
      },
    })
  );

  return data;
};
