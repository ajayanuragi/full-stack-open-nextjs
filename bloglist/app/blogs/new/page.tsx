"use client";
import { createBlog } from "@/app/actions/blogs";
import { useActionState } from "react";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { error: "" });
  return (
    <div>
      <h2>Add new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input type="text" name="title" required minLength={5} />
          </label>
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" required minLength={5} />
          </label>
        </div>
        <div>
          <label>
            URL
            <input type="text" name="url" required minLength={5} />
          </label>
        </div>
        <button type="submit">add blog</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
};
export default NewBlog;
