import GraphQLClient from "./graphql-client";
import {
  LatestRound,
  RawLatestRoundData,
  RoundData,
  type RawRoundData,
  type RawSubmissionsData,
} from "../types";
import { Address } from "viem";

class MissingDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingDataError";
  }
}

export const GET_LATEST_ROUND_NUMBER = () => `
query LatestRound {
  rounds(orderBy: "id", orderDirection: "desc", limit: 1) {
    items {
      id
    }
  }
}
`;

export const GET_ROUND = (id: number) => `
query CurrentRound {
  round(id: "${id}") {
    id
    question
    submissionDeadline
    potAmount
		decimals
		numWinners
    feeAmount
    initRoundTxnHash
		submissionCount
    isFinalized
    correctAnswer
    winningAnswer
    winners
    setCorrectAnswerTxnHash
  }
}
`;

export const GET_USER_SUBMISSIONS = (address: Address, round: number) => `
query UserSubmissions {
  submissions(
    where: { submitter: "${address}", roundId: "${round}" }
		orderBy: "entry"
		orderDirection: "asc"
  ) {
    items {
      entry
      roundId
      txnHash
			submitter
			timestamp
    }
  }
}
`;

export const GET_RECENT_SUBMISSIONS = (round: number) => `
query RecentSubmissions {
  submissions(
    where: { roundId: "${round}" }
		orderBy: "timestamp"
		orderDirection: "desc"
		limit: 7
  ) {
    items {
      entry
      roundId
      txnHash
			submitter
			timestamp
    }
  }
}
`;

export default class ApiClient {
  private client: GraphQLClient;

  constructor(baseURL: string) {
    this.client = new GraphQLClient(baseURL);
  }

  /** Get round count */

  async getLatestRoundNumber(): Promise<LatestRound> {
    const query = GET_LATEST_ROUND_NUMBER();
    const data = await this.client.query<RawLatestRoundData>(query);
    return { id: Number(data.rounds.items[0].id) };
  }

  /** Get round data */

  #formatRound(data: RawRoundData): RoundData {
    const rnd = data.round;
    const questionParts = rnd.question.split("||");
    if (!rnd.isFinalized) {
      return {
        roundState: "active",
        ...rnd,
        id: Number(rnd.id),
        question: questionParts[0].trim(),
        payoutDetails: questionParts.length > 1 ? questionParts[1].trim() : "",
        submissionDeadline: BigInt(rnd.submissionDeadline),
        potAmount: BigInt(rnd.potAmount),
        feeAmount: BigInt(rnd.feeAmount),
        isFinalized: false,
        correctAnswer: null,
        winningAnswer: null,
        winners: null,
        setCorrectAnswerTxnHash: null,
      };
    } else {
      return {
        roundState: "past",
        ...rnd,
        id: Number(rnd.id),
        question: questionParts[0].trim(),
        payoutDetails: questionParts.length > 1 ? questionParts[1].trim() : "",
        submissionDeadline: BigInt(rnd.submissionDeadline),
        potAmount: BigInt(rnd.potAmount),
        feeAmount: BigInt(rnd.feeAmount),
        isFinalized: true,
        correctAnswer: BigInt(rnd.correctAnswer),
        winningAnswer: BigInt(rnd.winningAnswer),
      };
    }
  }

  async getRound(id: number): Promise<RoundData> {
    const query = GET_ROUND(id);
    const data = await this.client.query<RawRoundData | { round: null }>(query);
    if (data.round === null) throw new MissingDataError(`No round of id ${id} found`);
    return this.#formatRound(data);
  }

  /** Get submission data */

  async getUserRoundSubmissions(address: Address, round: number): Promise<RawSubmissionsData> {
    const query = GET_USER_SUBMISSIONS(address, round);
    const data = await this.client.query<RawSubmissionsData>(query);
    if (data.submissions.items.length === 0) {
      throw new MissingDataError(`No submissions found for ${address} in round ${round}`);
    }
    return data;
  }

  async getRecentSubmissions(round: number): Promise<RawSubmissionsData> {
    const query = GET_RECENT_SUBMISSIONS(round);
    const data = await this.client.query<RawSubmissionsData>(query);
    if (data.submissions.items.length === 0) {
      throw new MissingDataError(`No submissions found in round ${round}`);
    }
    return data;
  }
}
