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
import { Input } from "@/components/ui/input";
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

export default function Submit({ round, feeAmount }: { round: number; feeAmount: bigint }) {
  return (
    <div className="mt-8 space-y-1">
      <h3 className="font-medium">Submit a Prediction</h3>
      <Card className="px-2 py-3">
        <CardContent>
          <SubmitForm round={round} feeAmount={feeAmount} />
        </CardContent>
      </Card>
    </div>
  );
}

const guessFormSchema = z.object({
  guess: z.coerce.number().positive(),
});
type GuessForm = z.infer<typeof guessFormSchema>;

function SubmitForm({ round, feeAmount }: { round: number; feeAmount: bigint }) {
  const config = useConfig();
  const form = useForm<GuessForm>({
    resolver: zodResolver(guessFormSchema),
    defaultValues: { guess: 0 },
  });

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
    } catch (error) {
      console.error(error);
      toast.error("Oops! Something went wrong.");
    }

    form.reset();
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
                  <Input
                    placeholder="Enter a guess"
                    onFocus={(e) => e.target.select()}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  * Submitting requires a {formatEther(feeAmount)} ETH fee
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="secondary" type="submit" disabled={form.formState.isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
