"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import { formatEther } from "viem";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { writeContract } from "@wagmi/core";
import { useConfig } from "wagmi";
import { JellybeansABI } from "@/constants/JellybeansABI";
import { jellybeansAddress } from "@/constants/contracts";
import { Card, CardContent } from "@/components/ui/card";
import { useCountdownPassed } from "@/lib/hooks";
import { Lightbulb } from "lucide-react";

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
    <div className="mt-8 space-y-1">
      <h3 className="font-medium">Submit a Prediction</h3>
      <Card className="px-4 py-5">
        <CardContent>
          <SubmitForm round={round} feeAmount={feeAmount} submissionDeadline={submissionDeadline} />
        </CardContent>
      </Card>
    </div>
  );
}

const guessFormSchema = z.object({
  guess: z.coerce.number().positive(),
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

  const isSubmissionPassed = useCountdownPassed(submissionDeadline);

  async function onSubmit(values: GuessForm) {
    console.log(values);

    try {
      await writeContract(config, {
        abi: JellybeansABI,
        address: jellybeansAddress,
        functionName: "submitGuess",
        args: [BigInt(round), BigInt(values.guess)],
        value: feeAmount,
      });

      toast.success("Success! Your guess was submitted.");
      form.reset();
    } catch (error) {
      console.error(error);

      toast.error("Oops! Something went wrong.");
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
                <FormLabel className="sr-only">Guess</FormLabel>
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
