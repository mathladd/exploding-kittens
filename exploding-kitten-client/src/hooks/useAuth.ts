import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { hashPass } from 'helpers/string';
import { createMe } from 'pages/api/user';
import { PATH } from 'constants/config';
import { PlayerData } from '../../../types/auth';

export default function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const signUp = async ({
    username,
    password,
    email,
  }: {
    username: string;
    password: string;
    email?: string;
  }) => {
    setIsSignupLoading(true);
    const passhash = hashPass({ username, password });
    const data = await createMe({ username, passhash, email });
    setIsSignupLoading(false);
    return data;
  };

  const login = ({ username, password }: { username: string; password: string }) => {
    signIn('credentials', { username, password, callbackUrl: PATH.LOBBY, redirect: false }).then(
      ({ ok, error }) => {
        if (ok) {
          router.push(PATH.LOBBY);
        } else {
          console.log('Error: ', error);
        }
      },
    );
  };

  const logout = () => {
    signOut().then(() => router.push(PATH.LOBBY));
  };

  return {
    signUp,
    isSignupLoading,
    login,
    logout,
    user: session?.user as unknown as PlayerData,
    status,
  };
}
