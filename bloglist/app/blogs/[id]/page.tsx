import { getBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = getBlogById(Number(id));
  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <span> - {blog.author}</span>
      <p>{blog.url}</p>
      <p>{blog.likes}</p>
    </div>
  );
};
export default BlogPage;
