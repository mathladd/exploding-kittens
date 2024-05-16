import { createUser, readUser, updateUser } from "../repo/repoUser";

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
  return user?.data;
};

export const onGetMe = async ({
  username,
  passhash,
  isLogin,
}: {
  username: string;
  passhash: string;
  isLogin?: boolean;
}) => {
  console.log("getme", username, passhash);
  const user = await readUser({ username, passhash });

  if (!!user && !!isLogin) {
    updateUser({
      username,
      passhash,
      lastAccess: new Date().toISOString().replace("T", " ").slice(0, 19),
    });
  }
  return user?.data;
};
