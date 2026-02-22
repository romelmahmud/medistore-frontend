import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
console.log(env.NEXT_PUBLIC_AUTH_URL);
export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  credentials: "include", // ✅ must have this
});
