import { z } from "zod";

// URL PARAMS

export const numSchema = z.coerce.number().positive();
export type NumType = z.infer<typeof numSchema>;

// DATA

export type RawRoundData = readonly [
  string,
  bigint,
  bigint,
  bigint,
  bigint,
  boolean
];

export type PreviousRoundData = {
  round: number;
  question: string;
  submissionDeadline: bigint;
  potAmount: bigint;
  feeAmount: bigint;
  correctAnswer: bigint;
  isFinalized: true;
};

export type CurrentRoundData = {
  round: number;
  question: string;
  submissionDeadline: bigint;
  potAmount: bigint;
  feeAmount: bigint;
  correctAnswer: 0n;
  isFinalized: false;
};

export type FutureRoundData = {
  round: number;
  question: "";
  submissionDeadline: 0n;
  potAmount: 0n;
  feeAmount: 0n;
  correctAnswer: 0n;
  isFinalized: false;
};
