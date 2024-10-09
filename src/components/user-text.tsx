"use client";

import { useQuery } from "@tanstack/react-query";

export default function UserText({ address }: { address: string }) {
  const { data, isLoading, isSuccess } = useQuery<EnsData>({
    queryKey: ["ens-lookup", address],
    queryFn: () => fetch(`https://api.ensdata.net/${address}`).then((res) => res.json()),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  if (isLoading) return <>{address.slice(0, 9)}...</>;
  if (!isSuccess) return <>{address.slice(0, 9)}...</>;
  if (!data.ens_primary) return <>{address.slice(0, 9)}...</>;
  return <>{data.ens_primary}</>;
}

type EnsData = {
  address: string;
  contentHash: null;
  ens: string;
  ens_primary: string;
  resolverAddress: string;
  wallets: {
    eth: string;
  };
};
