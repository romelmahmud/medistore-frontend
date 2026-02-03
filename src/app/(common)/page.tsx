import { authClient } from "@/lib/auth-client";

const HomePage = async () => {
  const session = await authClient.getSession();
  console.log(session);
  return <div>HomePage</div>;
};

export default HomePage;
