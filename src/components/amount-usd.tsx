import { useQuery } from "@tanstack/react-query";

export function AmountUSD({
  amount,
  token,
  decimals = 0,
}: {
  amount: number;
  token: "op" | "eth";
  decimals?: number;
}) {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [`${token}-price`],
    queryFn: (): Promise<{ price: number }> =>
      fetch(`/api/price/${token}`).then((res) => res.json()),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    gcTime: Infinity,
  });

  if (isLoading) return <>...</>;
  if (!isSuccess) return <></>;

  return (
    <>
      (~$
      {(amount * data.price).toFixed(decimals)})
    </>
  );
}
