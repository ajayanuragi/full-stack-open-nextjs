"use server";
import { revalidatePath } from "next/cache";
import { addBlog, like } from "../services/blogs";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const createBlog = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const title = formData.get("title") as string;
  if (!title || title.length < 5) {
    return { error: "title must be at least 5 characters long" };
  }
  const url = formData.get("url") as string;
  if (!url || url.length < 5) {
    return { error: "url must be at least 5 characters long" };
  }
  const author = formData.get("author") as string;
  if (!author || author.length < 5) {
    return { error: "author must be at least 5 characters long" };
  }

  await addBlog(title, url, author, 0);
  revalidatePath("/blogs");
  redirect("/blogs");
};

export const increaseLike = async (formData: FormData) => {
  const id = formData.get("id");

  await like(Number(id));
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
