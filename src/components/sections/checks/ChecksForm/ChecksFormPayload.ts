export type ChecksFormPayload = {
  request_id: string;
  subject: ISubject | undefined;
  resource: IResource | undefined;
  action: IAction | undefined;
  context: string | undefined;
  evaluations: IEvaluation[];
};

export interface ISubject {
  type: string;
  id: string;
  source: string;
  properties:
    | {
        isSuperUser: boolean;
      }
    | string;
}

export interface IResource {
  type: string;
  id: string;
  properties:
    | {
        isEnabled: boolean;
      }
    | string;
}

export interface IAction {
  name: string;
  properties:
    | {
        isEnabled: boolean;
      }
    | string;
}

export interface IEvaluation {
  request_id: string;
  resource?: IResource;
  action?: IAction;
  subject?: ISubject;
  context?: string;
}
