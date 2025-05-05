export type EvaluationsFormPayload = {
  request_id: string;
  subject: ISubject | null;
  resource: IResource | null;
  action: IAction | null;
  context: string | null;
  evaluations: IEvaluation[];
};

export interface ISubject {
  type: string | null;
  id: string | null;
  source: string | null;
  properties:
    | {
        isSuperUser: boolean;
      }
    | string
    | null;
}

export interface IResource {
  type: string | null;
  id: string | null;
  properties:
    | {
        isEnabled: boolean;
      }
    | string
    | null;
}

export interface IAction {
  name: string | null;
  properties:
    | {
        isEnabled: boolean;
      }
    | string
    | null;
}

export interface IEvaluation {
  request_id: string;
  resource?: IResource;
  action?: IAction;
  subject?: ISubject;
  context?: string;
}
