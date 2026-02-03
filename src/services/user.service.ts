import { cookies } from "next/headers";

const getSession = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch("http://localhost:8000/api/auth/get-session", {
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

export const userService = { getSession };
