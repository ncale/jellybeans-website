import { FALLBACK_IMAGE_PATH } from "@/constants/links";
import RecentSubmissions from "./_components/recent-submissions";
import { numSchema } from "@/lib/types";
import NotFound from "@/app/not-found";
import Pagination from "./_components/pagination";
import { getTokenImagePath } from "@/lib/utils";
import ImageWithFallback from "@/components/ui/image-with-fallback";

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
      <section className="py-6">
        <h2 className="mb-2 text-center text-2xl font-bold md:text-4xl">
          Make Predictions, Win OP
        </h2>
        <Pagination currentRound={round} />
      </section>
      <section className="flex flex-col gap-8 md:flex-row md:gap-4">
        <section className="relative overflow-hidden md:h-fit md:w-1/2">
          <ImageWithFallback
            src={getTokenImagePath(round)}
            fallbackSrc={FALLBACK_IMAGE_PATH}
            alt={`Round ${round} token image`}
            className="aspect-square w-full rounded border-4 border-muted-foreground"
            width={500}
            height={500}
          />
        </section>
        <section className="space-y-4 md:w-1/2">{children}</section>
      </section>
      <section className="mt-12">
        <RecentSubmissions round={round} />
      </section>
    </>
  );
}
