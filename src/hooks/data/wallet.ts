import { useQuery } from '@tanstack/react-query';
import { QUERY_PATHS } from '../../utils/constants';
import { getTransactions, getWallet } from '../../api/wallet';

export const useWallet = () => {
  return useQuery({
    queryKey: [QUERY_PATHS.WALLET],
    queryFn: () => getWallet(),
  });
};

export const useTransactions = (id: string) => {
  return useQuery({
    queryKey: [QUERY_PATHS.WALLET_TRANSACTIONS, id],
    queryFn: () => getTransactions(id),
    enabled: !!id,
  });
};
