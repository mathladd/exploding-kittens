import { axios } from 'helpers/axios';
import { APIRes } from 'types/common';
import { PlayerData } from '../../../../types/auth';

export const getMe = async ({ username, passhash }: { username: string; passhash: string }) => {
  const token = 'my_token';
  const user = await axios.post(
    `/user/me`,
    { username, passhash },
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
  return user?.data as APIRes;
};
