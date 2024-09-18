class GraphQLError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GraphQLError";
  }
}

class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export default class GraphQLClient {
  private baseURL: string;
  private headers: Headers;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.headers = new Headers({
      "Content-Type": "application/json",
    });
  }

  async query<T>(query: string): Promise<T> {
    try {
      const res = await fetch(this.baseURL, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new AuthenticationError("Authentication failed");
        }
        throw new NetworkError(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      if (result.errors) {
        throw new GraphQLError(result.errors[0].message);
      }

      return result.data as T;
    } catch (error) {
      if (
        error instanceof GraphQLError ||
        error instanceof NetworkError ||
        error instanceof AuthenticationError
      ) {
        throw error;
      }
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }

  setHeader(key: string, value: string): void {
    this.headers.set(key, value);
  }
}
