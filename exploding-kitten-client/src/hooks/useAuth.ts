import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { hashPass } from 'helpers/string';
import { createMe } from 'pages/api/user';
import { PATH } from 'constants/config';
import { userAtom } from 'atoms/connection';

export default function useAuth() {
  const { data: session, status } = useSession();
  const user = useAtomValue(userAtom);
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
    signIn('credentials', { username, password, callbackUrl: PATH.LOBBY, redirect: false });
  };

  const logout = () => signOut();

  return {
    signUp,
    isSignupLoading,
    login,
    logout,
    session,
    user,
    status,
  };
}
