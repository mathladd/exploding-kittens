import { useQuery } from '@tanstack/react-query';
import { getDeck, getPlayerCards } from 'apis/card';

export const useGetDeck = () => {
  const { data } = useQuery({
    queryFn: () => getDeck(),
    queryKey: ['profileBasicInfo'],
    enabled: true,
    retry: (failureCount, error) => {
      const err = error as unknown as { response: { status: number } };
      return err?.response?.status !== 401 && failureCount < 3;
    },
  });

  return { deck: data };
};

export const useGetPlayerCards = () => {
  const { data } = useQuery({
    queryFn: () => getPlayerCards(),
    queryKey: ['profileBasicInfo'],
    enabled: true,
    retry: (failureCount, error) => {
      const err = error as unknown as { response: { status: number } };
      return err?.response?.status !== 401 && failureCount < 3;
    },
  });

  return { playerCards: data };
};
