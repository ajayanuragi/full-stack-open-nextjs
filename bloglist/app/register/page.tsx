"use client";
import { useActionState } from "react";
import { registerUser } from "../actions/users";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { error: "" });
  return (
    <div className="mx-auto my-10 w-lg rounded-sm px-6 py-6">
      <h2 className="text-2xl font-bold text-black">Register</h2>
      <form action={formAction} className="py-4">
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              minLength={4}
              className="w-full outline rounded px-2"
            />
          </label>
        </div>
        <div className="my-4">
          <label>
            name
            <input
              type="text"
              name="name"
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
              minLength={4}
              className="w-full outline rounded px-2"
            />
          </label>
        </div>
        <div className="my-4">
          <label>
            Password Confirm
            <input
              type="password"
              name="passwordConfirm"
              required
              minLength={4}
              className="w-full outline rounded px-2"
            />
          </label>
        </div>

        <button
          type="submit"
          className="my-4 bg-gray-800 text-background px-4 py-2 rounded w-full"
        >
          Register
        </button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
}
