export interface ICheckResponse {
  decision: boolean;
  details: {
    reasonAdmin: string;
    reasonUser: string;
  };
}
