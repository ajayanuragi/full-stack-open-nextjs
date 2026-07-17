"use server";
import { revalidatePath } from "next/cache";
import { addBlog, like } from "../services/blogs";
import { redirect } from "next/navigation";

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const author = formData.get("author") as string;

  addBlog(title, url, author, 0);
  revalidatePath("/blogs");
  redirect("/blogs");
};

export const increaseLike = async (formData: FormData) => {
  const id = formData.get("id");
  console.log("button cliked");
  like(Number(id));
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
