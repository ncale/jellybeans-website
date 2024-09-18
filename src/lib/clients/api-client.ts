import GraphQLClient from "./graphql-client";
import { type RawRoundData, type RawSubmissionsData } from "../types";
import { Address } from "viem";

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
    }
  }
}
`;

export default class ApiClient {
  private client: GraphQLClient;

  constructor(baseURL: string) {
    this.client = new GraphQLClient(baseURL);
  }

  async getRound(id: number): Promise<RawRoundData> {
    const query = GET_ROUND(id);
    return this.client.query<RawRoundData>(query);
  }

  async getUserRoundSubmissions(address: Address, round: number): Promise<RawSubmissionsData> {
    const query = GET_USER_SUBMISSIONS(address, round);
    return this.client.query<RawSubmissionsData>(query);
  }
}
