import { userService } from "@/services/user.service";

const HomePage = async () => {
  const { data } = await userService.getSession();

  console.log(data);
  return <div>HomePage</div>;
};

export default HomePage;
