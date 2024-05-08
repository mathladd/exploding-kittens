import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH } from 'constants/config';
import useAuth from 'hooks/useAuth';

export default function MainPage() {
  const router = useRouter();
  const { user } = useAuth();

  // useEffect(() => {
  //   router.push(PATH.LOBBY);
  // }, [router]);
}
