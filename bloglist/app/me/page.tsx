import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";

import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { generateToken, markRead } from "../actions/me";
import { getReadingList } from "../services/me";
import Link from "next/link";

const MePage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }
  const user = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  });

  if (!user) {
    notFound();
  }
  const readingList = await getReadingList();
  const unreadBlogs = readingList.filter((item) => !item.read);
  const readBlogs = readingList.filter((item) => item.read);

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-6 text-gray-600">
      <h2 className="font-bold text-2xl text-gray-800">My Profile</h2>

      <div className="border-b py-2 my-3">
        <p>
          <span className="font-bold">Name:</span> {user.name}
        </p>

        <p>
          <span className="font-bold">Username:</span> {user.username}
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-black my-4">Reading List</h2>
        <h3 className="text-xl font-bold text-black mt-4">
          Unread ({unreadBlogs.length})
        </h3>
        <ul>
          {unreadBlogs?.map((item) => (
            <li key={item.id} className="border-b py-2 flex items-center gap-4">
              <Link className="font-bold" href={`/blogs/${item.blog?.id}`}>
                {item?.blog?.title}
              </Link>
              <form action={markRead}>
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  className="bg-green-600 text-white rounded px-1 py-1 text-sm hover:bg-green-500"
                >
                  mark as read
                </button>
              </form>
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-bold text-black mt-4">
          Read ({readBlogs.length})
        </h3>
        <ul>
          {readBlogs.map((item) => (
            <li key={item.id} className="border-b py-2 flex items-center gap-4">
              <Link className="font-bold" href={`/blogs/${item.blog?.id}`}>
                {item?.blog?.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl my-2">API Token</h2>

        {user.token ? (
          <div className="bg-gray-100 px-2 py-1 m-1">
            <p>Curren Token: </p>
            <p className="bg-gray-300 text-black mb-2 p-1">{user.token}</p>
            <form action={generateToken}>
              <input type="hidden" name="username" value={user.username} />
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded">
                Generate New Token
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-gray-100 px-2 py-1 m-1">
            <p className="mb-2">No token has been generated yet.</p>
            <form action={generateToken}>
              <input type="hidden" name="username" value={user.username} />
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded">
                Generate Token
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default MePage;
