import { env } from "@/env";
import { GetMedicinesParams, MedicineAddType, ServiceOptions } from "@/types";
import { MedicineUpdateType } from "@/types/medicine.type";

import { cookies } from "next/headers";

const API_URL = env.API_URL;

const getMedicines = async (
  params?: GetMedicinesParams,
  options?: ServiceOptions,
) => {
  try {
    const url = new URL(`${API_URL}/medicines`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, value.toString());
        }
      });
    }
    const config: RequestInit = {};
    if (options?.cache) {
      config.cache = options.cache;
    }
    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate };
    }

    config.next = { ...config.next, tags: ["medicines"] };

    const res = await fetch(url.toString(), config);

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

const getMedicineById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/medicines/${id}`, {
      cache: "no-store",
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

const createMedicine = async (medicineData: MedicineAddType) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/medicines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(medicineData),
    });
    const data = await res.json();
    if (data.error) {
      return {
        data: null,
        error: {
          message: data.error || "Error: Post not created",
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

const updateMedicine = async (id: string, medicineData: MedicineUpdateType) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/medicines/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(medicineData),
      next: {
        tags: ["update-medicine"],
      },
    });
    const data = await res.json();
    if (data.error) {
      return {
        data: null,
        error: {
          message: data.error || "Error: Post not created",
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

export const medicineService = {
  getMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
};
