import { ChangeEvent, useState } from 'react';
import useAuth from 'hooks/useAuth';

export default function LoginModule() {
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

  return (
    <div className="flex space-x-8">
      <div className="text-slate-500">
        <input placeholder="set username" value={username} onChange={handleInputUsername} />
        <input placeholder="set password" value={password} onChange={handleInputPassword} />
      </div>
      <button type="button" className="text-slate-800" onClick={onLoginClick}>
        Login
      </button>
    </div>
  );
}
