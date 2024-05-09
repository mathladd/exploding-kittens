import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH } from 'constants/config';
import useAuth from 'hooks/useAuth';

export default function MainPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      !user ? router.push(PATH.LOGIN) : router.push(PATH.LOBBY);
    }
  }, [isLoading, user, router]);
}
