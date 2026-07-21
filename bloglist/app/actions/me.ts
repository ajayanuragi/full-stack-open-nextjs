"use server";
import { revalidatePath } from "next/cache";
import { addToken } from "../services/me";

export const generateToken = async (formData: FormData) => {
  const username = (formData.get("username") as string).trim();
  await addToken(username);
  revalidatePath("/me");
};
