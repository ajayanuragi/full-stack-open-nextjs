import { db } from "@/db";
import { blogs, readingList } from "@/db/schema";
import { desc, eq, ilike } from "drizzle-orm";
import { getCurrentUser } from "./session";

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
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  const [blog] = await db
    .insert(blogs)
    .values({
      title,
      author,
      url,
      likes,
      userId: user.id,
    })
    .returning();
  await db.insert(readingList).values({ userId: user.id, blogId: blog.id });
};
export const addToReadingList = async (userId: number, blogId: number) => {
  await db.insert(readingList).values({
    userId,
    blogId,
  });
};

export const isInReadingList = async (userId: number, blogId: number) => {
  const item = await db.query.readingList.findFirst({
    where: (readingList, { and, eq }) =>
      and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
  });
  return !!item;
};
