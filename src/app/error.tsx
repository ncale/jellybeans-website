"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section>
        <h1 className="text-2xl font-bold">{"Oops! Something went wrong."}</h1>

        <Link href="/" className="hover:underline">
          Go home
        </Link>
      </section>
    </>
  );
}
