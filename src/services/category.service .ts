import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;
const getCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      next: {
        tags: ["categories"],
      },
    });
    const data = await res.json();

    if (data.success) {
      return {
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
const getCategoryById = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });
    const data = await res.json();
    if (data.error) {
      return {
        data: null,
        error: {
          message: data.error || "Error: Category get error",
        },
      };
    }

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: { message: "Something went wrong" },
    };
  }
};

export const categoriesService = { getCategories, getCategoryById };
