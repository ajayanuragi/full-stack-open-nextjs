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
    <div className="max-w-lg mx-auto p-6 ">
      <h2 className="text-3xl font-bold mb-4">Add new blog</h2>
      <form action={formAction}>
        <div className="my-4">
          <label>
            Title
            <input
              type="text"
              name="title"
              required
              minLength={5}
              defaultValue={state.values?.title}
              className="w-full outline rounded px-2"
            />
          </label>
        </div>
        <div className="my-4">
          <label>
            Author
            <input
              type="text"
              name="author"
              required
              minLength={5}
              defaultValue={state.values?.author}
              className="w-full outline rounded px-2"
            />
          </label>
        </div>
        <div className="my-4">
          <label>
            URL
            <input
              type="text"
              name="url"
              required
              minLength={5}
              defaultValue={state.values?.url}
              className="w-full outline rounded px-2"
            />
          </label>
        </div>
        <button
          type="submit"
          className="my-4 bg-gray-800 text-background px-4 py-2 rounded w-full"
        >
          add blog
        </button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
};
export default NewBlog;
