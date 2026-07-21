import { db } from "@/db";
import { readingList, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "./session";

export const addToken = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  if (!user) {
    return null;
  }
  const token = crypto.randomUUID();
  await db.update(users).set({ token }).where(eq(users.username, username));
};

export const getReadingList = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }
  return await db.query.readingList.findMany({
    where: eq(readingList.userId, user?.id),
    with: {
      blog: true,
    },
  });
};
