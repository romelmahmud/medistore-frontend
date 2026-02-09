import { env } from "@/env";
import { CategoryUpdateType } from "@/types";
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
const updateCategory = async (id: string, categoryData: CategoryUpdateType) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(categoryData),
    });
    const data = await res.json();
    if (data.error) {
      return {
        data: null,
        error: {
          message: data.error || "Error: Category updating error",
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

const createCategory = async (categoryData: CategoryUpdateType) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/categories/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(categoryData),
    });
    const data = await res.json();
    if (data.error) {
      return {
        data: null,
        error: {
          message: data.error || "Error: Category creation error",
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
const deleteCategory = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
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
          message: data.error || "Error: Category deleting error",
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
export const categoriesService = {
  getCategories,
  getCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
};
