import { Hex } from "viem";
import { z } from "zod";

// URL PARAMS

export const numSchema = z.coerce.number().positive();
export type NumType = z.infer<typeof numSchema>;

// DATA

export type RawRoundData = {
  round: {
    id: string; // -> bigint
    question: string;
    submissionDeadline: string; // -> bigint
    potAmount: string; // -> bigint
    feeAmount: string; // -> bigint
    initRoundTxnHash: Hex;
    isFinalized: boolean;
    correctAnswer: string; // -> bigint
    winningAnswer: string; // -> bigint
    winners: Hex[];
    setCorrectAnswerTxnHash: Hex;
  };
};

export type RoundData = ActiveRoundData | PastRoundData;

export type ActiveRoundData = {
  roundState: "active";
  id: number;
  question: string;
  submissionDeadline: bigint;
  potAmount: bigint;
  feeAmount: bigint;
  initRoundTxnHash: Hex;
  isFinalized: false;
  correctAnswer: null;
  winningAnswer: null;
  winners: null;
  setCorrectAnswerTxnHash: null;
};

export type PastRoundData = {
  roundState: "past";
  id: number;
  question: string;
  submissionDeadline: bigint;
  potAmount: bigint;
  feeAmount: bigint;
  initRoundTxnHash: Hex;
  isFinalized: true;
  correctAnswer: bigint;
  winningAnswer: bigint;
  winners: Hex[];
  setCorrectAnswerTxnHash: Hex;
};
