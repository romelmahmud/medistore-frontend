"use server";

import { userService } from "@/services/user.service";

export const getUser = async () => {
  const { data } = await userService.getSession();
  return data?.user;
};

export const getAllUsers = async () => {
  const res = await userService.getAllUsers();
  return res;
};
