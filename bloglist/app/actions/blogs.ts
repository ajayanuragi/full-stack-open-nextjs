"use server";
import { revalidatePath } from "next/cache";
import { addBlog } from "../services/blogs";
import { redirect } from "next/navigation";

export const createBlog = async (formdata: FormData) => {
  const title = formdata.get("title") as string;
  const url = formdata.get("url") as string;
  const author = formdata.get("author") as string;

  addBlog(title, url, author, 0);
  revalidatePath("/blogs");
  redirect("/blogs");
};
