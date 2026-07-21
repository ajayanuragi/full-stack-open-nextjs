import { getUserWithBlogs } from "@/app/services/users";
import { db } from "@/db";
import { blogs, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.slice(7).trim();
  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid API token" }, { status: 401 });
  }
  const result = await getUserWithBlogs(user.username);
  return NextResponse.json(result);
};
