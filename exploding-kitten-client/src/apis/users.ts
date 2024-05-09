import { axios } from 'helpers/axios';

export const getMe = async () => {
  const token = 'my_token';
  const user = await axios.post(
    `/user/me`,
    {},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return user;
};
