"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <div className="mx-auto my-10 w-lg rounded-sm px-6 py-6">
      <h2 className="text-2xl font-bold text-black">Login</h2>
      {error && <p style={{ color: "red" }}> {error}</p>}
      <form onSubmit={handleSubmit} className="py-4">
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              className="w-full outline rounded px-2"
            />
          </label>
        </div>
        <div className="my-4">
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              className="w-full outline rounded px-2"
            />
          </label>
        </div>
        <button
          type="submit"
          className="my-4 bg-gray-800 text-background px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
