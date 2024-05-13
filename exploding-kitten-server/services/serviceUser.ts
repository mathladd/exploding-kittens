import { createUser, readUser } from "../repo/repoUser";

export const onCreateMe = async ({
  username,
  passhash,
  email,
}: {
  username: string;
  passhash: string;
  email?: string;
}) => {
  const user = await createUser({ username, passhash, email });
  return user;
};

export const onGetMe = async ({
  username,
  passhash,
}: {
  username: string;
  passhash: string;
}) => {
  const user = await readUser({ username, passhash });
  return user;
};
