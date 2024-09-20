import { FALLBACK_IMAGE_URL } from "@/constants/data";
import Image from "next/image";
import RecentSubmissions from "./_components/recent-submissions";
import { numSchema } from "@/lib/types";
import NotFound from "@/app/not-found";

export default function RoundLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { num: string };
}) {
  const { success, data: round } = numSchema.safeParse(params.num);

  if (!success) return <NotFound />;

  return (
    <>
      <section className="flex gap-x-2">
        <section className="hidden w-1/2 p-2 md:block">
          <Image
            src={FALLBACK_IMAGE_URL}
            alt="this is a missing image placeholder"
            className="aspect-square w-full rounded border-4 border-muted-foreground"
            width={500}
            height={500}
          />
        </section>
        <section className="space-y-9 p-2 md:w-1/2">{children}</section>
      </section>
      <section className="mt-12">
        <RecentSubmissions round={round} />
      </section>
    </>
  );
}
