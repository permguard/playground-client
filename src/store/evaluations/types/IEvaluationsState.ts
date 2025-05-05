import { ICheckResponse } from "./api/ICheckResponse";

export interface IEvaluationsState {
  jsonCode?: string;
  selectedExample: string;
  isLoading: boolean;
  response: ICheckResponse | null;
  isModalOpen: boolean;
  isInitial: boolean;
}
