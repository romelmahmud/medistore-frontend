export type UserReturnType = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string;
  status: "ACTIVE" | "BANNED";
  phone: string | null;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
};
