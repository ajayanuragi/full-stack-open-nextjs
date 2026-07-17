import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = () => {
  const blogs = getBlogs();
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>- {blog.author}{" "}
            {blog.likes} {blog.url}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
