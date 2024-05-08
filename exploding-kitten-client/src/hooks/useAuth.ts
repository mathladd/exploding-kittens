import { axios } from 'helpers/axios';

export default function useAuth() {
  const user = axios.post(
    `/user/me`,
    {
      accessToken: 'myAccessToken',
    },
    {},
  );
  console.log(user);
  return { user };
}
