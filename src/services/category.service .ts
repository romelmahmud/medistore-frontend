import { env } from "@/env";

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

export const categoriesService = { getCategories };
