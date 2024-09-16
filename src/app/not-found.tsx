import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section>
        <h1 className="text-2xl font-bold">
          {"Uh oh! We can't find this page"}
        </h1>

        <Link href="/round/1" className="hover:underline">
          Go home
        </Link>
      </section>
    </>
  );
}
