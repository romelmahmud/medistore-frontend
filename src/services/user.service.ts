import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

const getSession = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${AUTH_URL}/get-session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const session = await res.json();

    if (session === null) {
      return {
        data: null,
        error: {
          message: "Session is missing",
        },
      };
    }
    return {
      data: session,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: {
        message: "Something went wrong",
      },
    };
  }
};

const getAllUsers = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/users`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: {
        tags: ["users"],
      },
    });
    const data = await res.json();

    if (data.success) {
      return {
        meta: data.meta,
        data: data.data,
        error: null,
      };
    }
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Something went wrong",
      },
    };
  }
};

export const userService = { getSession, getAllUsers };
