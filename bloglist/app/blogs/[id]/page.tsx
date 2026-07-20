import { increaseLike } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
      <span className="text-gray-500"> - {blog.author}</span>
      <p>{blog.url}</p>
      <p>{blog.likes}</p>
      <form action={increaseLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button
          type="submit"
          className="bg-gray-800 text-white px-3 py-1 rounded text-sm"
        >
          like
        </button>
      </form>
    </div>
  );
};
export default BlogPage;
