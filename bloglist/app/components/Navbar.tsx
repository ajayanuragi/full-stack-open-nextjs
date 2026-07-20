"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav>
      <Link href={"/"}>home page</Link>
      {" | "}
      <Link href={"/blogs"}>blogs</Link>
      {" | "}
      <Link href={"/users"}>users</Link>
      {" | "}
      {session ? (
        <>
          <Link href={"/blogs/new"}>create new</Link>
          {" | "}
          <em>{session.user?.name} logged in</em>{" "}
          <button onClick={() => signOut()}> logout</button>
        </>
      ) : (
        <>
          <Link href={"/login"}>login</Link>
          {" | "}
          <Link href={"/register"}>register</Link>
        </>
      )}
    </nav>
  );
}
