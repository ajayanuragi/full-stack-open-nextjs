"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const registerUser = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const username = (formData.get("username") as string).trim();
  if (!username || username.length < 4) {
    return { error: "username must be at least 4 characters long" };
  }
  const password = (formData.get("password") as string).trim();
  if (!password || password.length < 4) {
    return { error: "password must be at least 4 characters long" };
  }
  const passwordConfirm = (formData.get("passwordConfirm") as string).trim();
  if (!passwordConfirm || passwordConfirm !== password) {
    return { error: "password confirmation does not match" };
  }
  const name = (formData.get("name") as string).trim();

  const passwordHash = await bcrypt.hash(password, 10);
  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existingUser) {
    return { error: "A user with this username already exists." };
  }
  await db.insert(users).values({ username, name, passwordHash });
  redirect("/login");
};
