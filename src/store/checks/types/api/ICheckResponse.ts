interface Reason {
  Code: string;
  Message: string;
}

interface Context {
  ID: string;
  ReasonAdmin: Reason;
  ReasonUser: Reason;
}

interface Response {
  Decision: boolean;
  RequestID: string;
  Context: Context;
  Evaluations: unknown[];
}

export interface ICheckResponse {
  decision: boolean;
  response: Response;
  error: unknown;
}
