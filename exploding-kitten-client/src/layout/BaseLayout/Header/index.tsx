import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Stack from 'components/Stack';
import useAuth from 'hooks/useAuth';
import { PATH } from 'constants/config';

export default function Header() {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const { user, status, logout } = useAuth();

  const onLoginClick = () => {
    router.push(PATH.LOGIN);
  };

  const onLogoutClick = () => {
    logout();
  };

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Stack className="flex-col bg-blue-900 w-screen h-32 text-slate-800">
      <Stack className="w-full bg-blue-600 p-2 text-sm justify-end items-center text-white space-x-4">
        <div>User: {user?.username}</div>
        <div>Uid: {user?.uid}</div>
        <button
          type="button"
          onClick={user ? onLogoutClick : onLoginClick}
          className="bg-slate-700 py-2 px-3 rounded-lg"
        >
          {user ? 'Logout' : 'Login'}
        </button>
      </Stack>
      <Stack
        className={`w-full h-full justify-center items-center text-orange-500 font-bold text-3xl transition-all duration-2000 ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Astro-dog */}testing
      </Stack>
    </Stack>
  );
}
