"use server";

import { userService } from "@/services/user.service";
import { GetUserParams } from "@/types/user.type";
import { revalidateTag } from "next/cache";

export const getUser = async () => {
  const { data } = await userService.getSession();
  return data?.user;
};

export const getMe = async () => {
  const res = await userService.getMe();
  return res;
};

export const getAllUsers = async (params?: GetUserParams) => {
  const res = await userService.getAllUsers(params);
  return res;
};

export const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "BANNED",
) => {
  const res = await userService.updateUserStatus(userId, status);
  revalidateTag("users", "max");
  return res;
};
