"use client";
import { createBlog } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
const initialState = {
  error: "",
  success: false,
  values: {
    title: "",
    author: "",
    url: "",
  },
};

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState);
  const { showNotification } = useNotification();

  const router = useRouter();

  useEffect(() => {
    console.log(state);
    if (state.success) {
      console.log("calling notification");
      showNotification("blog added");
    }
  }, [state, showNotification, router]);
  return (
    <div>
      <h2>Add new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input
              type="text"
              name="title"
              required
              minLength={5}
              defaultValue={state.values?.title}
            />
          </label>
        </div>
        <div>
          <label>
            Author
            <input
              type="text"
              name="author"
              required
              minLength={5}
              defaultValue={state.values?.author}
            />
          </label>
        </div>
        <div>
          <label>
            URL
            <input
              type="text"
              name="url"
              required
              minLength={5}
              defaultValue={state.values?.url}
            />
          </label>
        </div>
        <button type="submit">add blog</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
};
export default NewBlog;
