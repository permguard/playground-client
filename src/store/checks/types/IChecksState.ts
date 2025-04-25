import { ICheckResponse } from "./api/ICheckResponse";

export interface IChecksState {
  jsonCode?: string;
  selectedExample: string;
  isLoading: boolean;
  response?: ICheckResponse;
  isModalOpen: boolean;
}
