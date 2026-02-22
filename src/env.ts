// src/env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  // Server-only environment variables
  server: {
    BACKEND_URL: z.string().url(),
    FRONTEND_URL: z.string().url(),
  },

  // Variables accessible in the browser (must start with NEXT_PUBLIC_)
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_AUTH_URL: z.string().url(),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string(),
  },

  // Runtime environment variable mapping
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  },
});
