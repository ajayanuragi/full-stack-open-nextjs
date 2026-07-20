"use server";
import { revalidatePath } from "next/cache";
import { addBlog, like } from "../services/blogs";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
type CreateBlogState = {
  error: string;
  errors?: Record<string, string>;
  values?: {
    title: string;
    author: string;
    url: string;
  };
  success?: boolean;
};

export const createBlog = async (
  prevState: CreateBlogState,
  formData: FormData,
): Promise<CreateBlogState> => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const author = formData.get("author") as string;

  const errors: Record<string, string> = {};
  if (title.length < 5) errors.title = "Title must be at least 5 characters";
  if (author.length < 5) errors.author = "Author must be at least 5 characters";
  if (url.length < 5) errors.url = "URL must be at least 5 characters";
  if (Object.keys(errors).length > 0) {
    return {
      error: "Validation failed",
      errors,
      success: false,
      values: {
        title,
        author,
        url,
      },
    };
  }

  await addBlog(title, url, author, 0);
  revalidatePath("/blogs");
  return { error: "", success: true };
};

export const increaseLike = async (formData: FormData) => {
  const id = formData.get("id");

  await like(Number(id));
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
