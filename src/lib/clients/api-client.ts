import GraphQLClient from "./graphql-client";
import { RawRoundData } from "../types";

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

export default class ApiClient {
  private client: GraphQLClient;

  constructor(baseURL: string) {
    this.client = new GraphQLClient(baseURL);
  }

  async getRound(id: number): Promise<RawRoundData> {
    const query = GET_ROUND(id);
    return this.client.query<RawRoundData>(query);
  }
}
