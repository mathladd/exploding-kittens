import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH } from 'constants/config';
import useAuth from 'hooks/useAuth';

export default function MainPage() {
  const router = useRouter();
  const { user, status } = useAuth();

  useEffect(() => {
    if (!(status === 'loading')) {
      !user ? router.push(PATH.LOGIN) : router.push(PATH.LOBBY);
    }
  }, [router, user, status]);
}
