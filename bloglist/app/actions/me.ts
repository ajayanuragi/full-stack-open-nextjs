"use server";
import { revalidatePath } from "next/cache";
import { addToken } from "../services/me";
import { markBlogAsRead } from "../services/blogs";

export const generateToken = async (formData: FormData) => {
  const username = (formData.get("username") as string).trim();
  await addToken(username);
  revalidatePath("/me");
};
export const markRead = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  console.log(id);
  await markBlogAsRead(id);
  revalidatePath("/me");
};
