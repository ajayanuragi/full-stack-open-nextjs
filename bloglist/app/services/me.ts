import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

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
