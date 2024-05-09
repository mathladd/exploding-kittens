import { useQuery } from '@tanstack/react-query';
import { getMe } from 'apis/users';
import { ENCRYPTION_SALT } from 'constants/config';
import { stringEncryption } from 'helpers/string';

export default function useAuth() {
  // const saltedData = getCookie('saltedData');
  const username = 'aaa';
  const password = 'myPassword123';
  const encryptedPassword = stringEncryption(ENCRYPTION_SALT, password);

  const { data: user, isLoading } = useQuery({
    queryFn: () => getMe(),
    queryKey: ['profileBasicInfo'],
    enabled: true,
    retry: (failureCount, error) => {
      const err = error as unknown as { response: { status: number } };
      return err?.response?.status !== 401 && failureCount < 3;
    },
  });

  return { user, isLoading };
}
