import { db } from "@/db";
import { blogs } from "@/db/schema";
import { desc, eq, ilike } from "drizzle-orm";

export const getBlogs = async (filter = "") => {
  return db.query.blogs.findMany({
    where: filter ? ilike(blogs.title, `%${filter}%`) : undefined,
    orderBy: desc(blogs.likes),
  });
};
export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const like = async (id: number) => {
  const blog = await getBlogById(id);
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes! + 1 })
      .where(eq(blogs.id, id));
  }
};

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  likes: number,
) => {
  const user = await db.query.users.findFirst();
  await db.insert(blogs).values({
    title,
    author,
    url,
    likes,
    userId: user!.id,
  });
};
