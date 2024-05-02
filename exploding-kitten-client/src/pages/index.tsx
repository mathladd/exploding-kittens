import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH } from 'constants/config';

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    router.push(PATH.LOBBY);
  }, [router]);
}
