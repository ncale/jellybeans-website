import GraphQLClient from "./graphql-client";
import {
  LatestRound,
  RawLatestRoundData,
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
  rounds(limit: 1, orderBy: "id", orderDirection: "desc") {
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
    feeAmount
    initRoundTxnHash
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
    where: { submitter: "${address}", round: "${round}" }
  ) {
    items {
      entry
      round
      txnHash
			submitter
    }
  }
}
`;

export const GET_RECENT_SUBMISSIONS = (round: number) => `
query RecentSubmissions {
  submissions(
    where: { round: "${round}" }
		limit: 7
  ) {
    items {
      entry
      round
      txnHash
			submitter
    }
  }
}
`;

export default class ApiClient {
  private client: GraphQLClient;

  constructor(baseURL: string) {
    this.client = new GraphQLClient(baseURL);
  }

  async getLatestRoundNumber(): Promise<LatestRound> {
    const query = GET_LATEST_ROUND_NUMBER();
    const data = await this.client.query<RawLatestRoundData>(query);
    return { id: Number(data.rounds.items[0].id) };
  }

  async getRound(id: number): Promise<RawRoundData> {
    const query = GET_ROUND(id);
    const data = await this.client.query<RawRoundData | { round: null }>(query);
    if (data.round === null) throw new MissingDataError(`No round of id ${id} found`);
    return data;
  }

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
