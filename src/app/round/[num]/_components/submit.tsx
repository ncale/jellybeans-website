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

const guessFormSchema = z.object({
  guess: z.coerce.number().positive(),
});
type GuessForm = z.infer<typeof guessFormSchema>;

export default function Submit({
  round,
  feeAmount,
}: {
  round: number;
  feeAmount: bigint;
}) {
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
      toast.error("Oops! Something went wrong.");
    }

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-x-2 font-bold text-md">
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
          <Button
            variant="secondary"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
