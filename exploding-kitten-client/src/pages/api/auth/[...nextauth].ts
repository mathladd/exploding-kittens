import NextAuth, { User as NextAuthUser, Account, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';
import { hashPass } from 'helpers/string';
import { PlayerData } from '../../../../../types/auth';
import { getMe } from '../user';

type NextAuthSession = { accessToken: string; user: PlayerData };

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _req) {
        const username = credentials?.username;
        const passhash = hashPass({
          username: credentials?.username,
          password: credentials?.password,
        });
        const user = await getMe({ username, passhash, isLogin: true });
        if (user) {
          return (
            ({
              uid: user?.uid ?? 1,
              username: user?.username,
              email: user?.email ?? '',
              createdAt: user?.createdAt,
              lastLoginAt: user?.lastLoginAt,
            } as unknown as NextAuthUser) ?? null
          );
        }

        return null;
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/require-await
    async jwt({
      token,
      user,
      account,
    }: // profile,
    {
      token: JWT;
      user: AdapterUser;
      account: Account;
      profile: any;
    }) {
      //

      // Persist the OAuth access_token and or the user id to the token right after signin
      // console.log('jwt token', token);
      // console.log('account', account);
      // console.log('profile', profile);
      const returnToken = { ...token };

      if (account) {
        // returnToken.accessToken = account.access_token;
        returnToken.user = user;
      }
      return returnToken;
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async session({
      session,
      // user,
      token,
    }: {
      session: Session;
      user: AdapterUser;
      token: JWT;
    }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // console.log('session', session);
      // console.log('token', token);
      // console.log('user', user);

      const returnSession = { ...session } as unknown as NextAuthSession;
      // returnSession.accessToken = token.accessToken as string;
      returnSession.user = token.user as PlayerData;

      return returnSession as unknown as Session;
    },
  },
};
export default NextAuth(authOptions);
