import { env } from "@/env";
import { GetMedicinesParams, ServiceOptions } from "@/types";

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

    const res = await fetch(url.toString(), config);

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

export const medicineService = { getMedicines, getMedicineById };
