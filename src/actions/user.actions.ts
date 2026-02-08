"use server";

import { userService } from "@/services/user.service";
import { revalidateTag } from "next/cache";

export const getUser = async () => {
  const { data } = await userService.getSession();
  return data?.user;
};

export const getAllUsers = async () => {
  const res = await userService.getAllUsers();
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
