"use server";

import { userService } from "@/services/user.service";

export const getUser = async () => {
  const { data } = await userService.getSession();
  return data?.user;
};
