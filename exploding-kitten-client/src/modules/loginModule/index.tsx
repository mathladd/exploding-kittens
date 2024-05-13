import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from 'hooks/useAuth';
import { PATH } from 'constants/config';
import Stack from 'components/Stack';

export default function LoginModule() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleInputUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
  };
  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const onLoginClick = () => {
    login({ username, password });
  };

  const onSignupClick = () => {
    router.push(PATH.SIGNUP);
  };

  return (
    <Stack className="flex-col space-y-4 text-sm text-slate-500 border border-slate-700 px-3 py-4 min-w-80 rounded-lg">
      <Stack className="flex-col space-y-2">
        <Stack className="w-full justify-between items-center">
          <div>Username: </div>
          <input
            placeholder="set username"
            value={username}
            onChange={handleInputUsername}
            className="border border-slate-700 px-2 py-1 rounded-md"
          />
        </Stack>
        <Stack className="w-full justify-between items-center">
          <div>Password: </div>
          <input
            placeholder="set password"
            value={password}
            onChange={handleInputPassword}
            className="border border-slate-700 px-2 py-1 rounded-md"
          />
        </Stack>
      </Stack>
      <button
        type="button"
        className="text-white bg-orange-500 border rounded-lg p-2 disabled:opacity-50 disabled:border-0"
        onClick={onLoginClick}
        disabled={!username || !password}
      >
        Login
      </button>
      <button
        type="button"
        className="text-blue-500 rounded-lg p-2 disabled:opacity-50 disabled:border-0"
        onClick={onSignupClick}
      >
        Sign Up!
      </button>
    </Stack>
  );
}
