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

import { formatEther } from "viem";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { useAccount, useConfig } from "wagmi";
import { JellybeansAbi } from "@/constants/JellybeansAbi";
import { jellybeansAddress } from "@/constants/contracts";
import { useCountdownPassed } from "@/lib/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { type ActiveRoundData, type RawSubmissionsData } from "@/lib/types";
import { bigintDateNow } from "@/lib/utils";
import InfoPopover from "@/components/info-popover";

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
    <div className="mt-4 space-y-1">
      <h3 className="flex items-baseline gap-x-1 font-medium">
        <span>Submit a Prediction</span>
        <InfoPopover
          text={
            "Winners are payed out per submission, meaning if you make 5 submissions and 3 win, you win 3 prizes\n- - -\nAlso! Receive 1 NFT per submission 🥳"
          }
        />
      </h3>
      <Card className="px-4 py-5">
        <CardContent>
          <SubmitForm round={round} feeAmount={feeAmount} submissionDeadline={submissionDeadline} />
        </CardContent>
      </Card>
    </div>
  );
}

const guessFormSchema = z.object({
  guess: z.coerce.number().positive().max(99999999999999), // only allows up to 14 digits; will need to refactor
});
type GuessForm = z.infer<typeof guessFormSchema>;

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

  const isSubmissionPassed = useCountdownPassed(submissionDeadline);

  async function onSubmit(values: GuessForm) {
    console.log(values);

    try {
      if (!isConnected) throw new NotConnectedError("Connect wallet to submit.");

      const hash = await writeContract(config, {
        abi: JellybeansAbi,
        address: jellybeansAddress,
        functionName: "submitGuess",
        args: [BigInt(round), BigInt(values.guess)],
        value: feeAmount,
      });
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
                  * Submitting requires a {formatEther(feeAmount)} ETH fee
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="secondary"
            type="submit"
            disabled={form.formState.isSubmitting || isSubmissionPassed}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
