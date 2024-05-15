import { axios } from 'helpers/axios';
import { PlayerData } from '../../../../types/auth';
import { APIRes } from '../../../../types/api';

export const getMe = async ({
  username,
  passhash,
  isLogin,
}: {
  username: string;
  passhash: string;
  isLogin: boolean;
}) => {
  const token = 'my_token';
  const user = await axios.post(
    `/user/me`,
    { username, passhash, isLogin },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return user?.data as unknown as PlayerData;
};

export const createMe = async ({
  username,
  passhash,
  email,
}: {
  username: string;
  passhash: string;
  email?: string;
}) => {
  const token = 'my_token';
  const user = await axios.post(
    `/user/create`,
    { username, passhash, email },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return user?.data as APIRes<>;
};
