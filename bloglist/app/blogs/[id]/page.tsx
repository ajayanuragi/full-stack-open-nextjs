import { addBlogToReadingList, increaseLike } from "@/app/actions/blogs";
import { getBlogById, isInReadingList } from "@/app/services/blogs";
import { getCurrentUser } from "@/app/services/session";
import { auth } from "@/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  if (!blog) {
    notFound();
  }

  const user = await getCurrentUser();

  const userId = user?.id;

  const isOwner = userId === blog.userId;
  const alreadyInReadingList = userId
    ? await isInReadingList(userId, blog.id)
    : false;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
      <span className="text-gray-600"> by {blog.author}</span>
      <p>{blog.likes}</p>
      <div className="flex items-center gap-4 my-4">
        <form action={increaseLike}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="bg-gray-800 text-white px-3 py-1 rounded text-sm"
          >
            like
          </button>
        </form>
        {userId && !isOwner && !alreadyInReadingList && (
          <form action={addBlogToReadingList}>
            <input type="hidden" name="blogId" value={blog.id} />
            <button
              type="submit"
              className="bg-green-600 text-white px-3 py-1 rounded text-sm"
            >
              Add to Reading List
            </button>
          </form>
        )}
      </div>
      <Link href={blog.url!} className="text-blue-500">
        {blog.url}
      </Link>
    </div>
  );
};
export default BlogPage;
