import { ICheckResponse } from "./api/ICheckResponse";

export interface IEvaluationsState {
  jsonCode?: string;
  selectedExample: string;
  isLoading: boolean;
  response?: ICheckResponse;
  isModalOpen: boolean;
  isInitial: boolean;
}
