export default function useAuth() {
  const login = ({ username, password }: { username: string; password: string }) => {
    console.log(username, password);
  };

  return { login };
}
