"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { toast } from "sonner";

import { formatEther, Hex } from "viem";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm, useWatch } from "react-hook-form";

import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { useAccount, useChainId, useConfig, useSendTransaction, useSwitchChain } from "wagmi";
import { JellyBeansAbi } from "@/constants/JellyBeansAbi";
import { JELLYBEANS_ADDRESS } from "@/constants/contracts";
import { useCountdownPassed } from "@/lib/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type ActiveRoundData, type RawSubmissionsData } from "@/lib/types";
import { bigintDateNow } from "@/lib/utils";
import { AmountUSD } from "@/components/amount-usd";
import { chains, createSession, executeSession } from "@paywithglide/glide-js";
import { glideConfig } from "@/lib/clients/glide";
import { useEffect, useRef, useState } from "react";

class NotConnectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotConnectedError";
  }
}

export default function Submit({
  round,
  feeAmount,
  submissionDeadline,
}: {
  round: number;
  feeAmount: bigint;
  submissionDeadline: bigint;
}) {
  return (
    <Card className="px-4 py-5">
      <CardContent>
        <SubmitForm round={round} feeAmount={feeAmount} submissionDeadline={submissionDeadline} />
      </CardContent>
    </Card>
  );
}

const guessFormSchema = z.object({
  guess: z.coerce.number().positive().max(99999999999999), // only allows up to 14 digits; will need to refactor
});
type GuessForm = z.infer<typeof guessFormSchema>;

// useDebouncedGuess returns guess value changes every 500ms. This avoids unnecessary network
// requests when the user is still making changes.
// It returns the guess value and `isDirty` which is set to true when the debounced value is
// different from the actual value.
const useDebouncedGuess = ({ control }: { control: Control<{ guess: number }> }) => {
  const [debouncedGuess, setDebouncedGuess] = useState(control._defaultValues.guess || 0);
  const timeout = useRef<NodeJS.Timeout>();

  const guess = useWatch({ name: "guess", control });

  useEffect(() => {
    clearInterval(timeout.current);

    timeout.current = setTimeout(() => {
      setDebouncedGuess(guess);
    }, 500);
  }, [guess]);

  return { guess: debouncedGuess, isDirty: guess !== debouncedGuess };
};

function SubmitForm({
  round,
  feeAmount,
  submissionDeadline,
}: {
  round: number;
  feeAmount: bigint;
  submissionDeadline: bigint;
}) {
  const config = useConfig();
  const form = useForm<GuessForm>({
    resolver: zodResolver(guessFormSchema),
    defaultValues: { guess: 0 },
  });

  const { address, isConnected } = useAccount();
  const queryClient = useQueryClient();
  const currentChainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { sendTransactionAsync } = useSendTransaction();

  const isSubmissionPassed = useCountdownPassed(submissionDeadline);

  const { guess, isDirty: isGuessDirty } = useDebouncedGuess({ control: form.control });

  const { data: glideSession, isSuccess: isGlideSessionReady } = useQuery({
    queryKey: ["glideSession", round, guess],
    queryFn: async () => {
      const session = await createSession(glideConfig, {
        account: address,
        chainId: chains.optimism.id,
        address: JELLYBEANS_ADDRESS,
        abi: JellyBeansAbi,
        functionName: "submitGuess",
        args: [BigInt(round), BigInt(guess)],
        value: feeAmount,
      });

      return session;
    },
    // Ensure a new session is created every 30s to avoid expired sessions
    refetchInterval: 30000,
  });

  async function onSubmit(values: GuessForm) {
    console.log(values);

    try {
      if (!isConnected) throw new NotConnectedError("Connect wallet to submit.");
      if (!glideSession) throw new Error("Transaction is not ready yet.");

      let hash: Hex;
      // If the user has funds on OP, continue with a direct `writeContract` call.
      // Else, we pay using Glide with cross-chain payment.
      if (glideSession.paymentChainId === `eip155:10`) {
        hash = await writeContract(config, {
          abi: JellyBeansAbi,
          address: JELLYBEANS_ADDRESS,
          functionName: "submitGuess",
          args: [BigInt(round), BigInt(values.guess)],
          value: feeAmount,
        });
      } else {
        const { sponsoredTransactionHash } = await executeSession(glideConfig, {
          session: glideSession,
          // @ts-expect-error: wagmi types are not set correctly
          currentChainId,
          sendTransactionAsync,
          switchChainAsync,
        });

        hash = sponsoredTransactionHash;
      }

      toast.message("Pending confirmation...");

      queryClient.setQueryData(["round-data", round], (old: ActiveRoundData | undefined) => ({
        ...old,
        submissionCount: old ? old.submissionCount + 1 : 1,
      }));
      queryClient.setQueryData(
        ["user-submissions", address, round],
        (old: RawSubmissionsData | undefined) => ({
          submissions: {
            items: [
              {
                entry: values.guess.toString(),
                round: round.toString(),
                submitter: address!,
                txnHash: hash,
                timestamp: bigintDateNow(),
              },
              ...(old ? old.submissions.items : []),
            ],
          },
        }),
      );
      queryClient.setQueryData(
        ["recent-submissions", round],
        (old: RawSubmissionsData | undefined) => ({
          submissions: {
            items: [
              {
                entry: values.guess.toString(),
                round: round.toString(),
                submitter: address!,
                txnHash: hash,
                timestamp: bigintDateNow(),
              },
              ...(old ? old.submissions.items : []),
            ],
          },
        }),
      );

      form.reset();

      await waitForTransactionReceipt(config, { hash });
      toast.success("Nice! Your submission went through.");
    } catch (error) {
      console.error(error);

      if (error instanceof NotConnectedError) {
        toast.error(error.message);
      } else {
        toast.error("Oops! Something went wrong.");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="text-md flex gap-x-2 font-bold">
          <FormField
            control={form.control}
            name="guess"
            render={({ field }) => (
              <FormItem className="grow">
                <legend className="sr-only">Guess</legend>
                <FormControl>
                  <div className="flex h-9 w-full items-center gap-x-1.5 rounded-md border border-input bg-transparent py-1 pl-3 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                    <Lightbulb className="h-5 w-5 text-muted-foreground" />
                    <input
                      placeholder="Enter a guess"
                      disabled={isSubmissionPassed}
                      onFocus={(e) => e.target.select()}
                      className="flex h-9 w-full rounded-md bg-transparent transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription className="mt-1">
                  * Submitting requires a {formatEther(feeAmount)} ETH (
                  <AmountUSD amount={Number(feeAmount) / 10 ** 18} token="eth" decimals={2} />) fee
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="secondary"
            type="submit"
            disabled={
              !isGlideSessionReady ||
              isGuessDirty ||
              form.formState.isSubmitting ||
              isSubmissionPassed
            }
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
