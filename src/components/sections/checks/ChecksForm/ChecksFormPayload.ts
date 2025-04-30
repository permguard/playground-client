export type ChecksFormPayload = {
  request_id: string;
  subject: ISubject;
  resource: IResource;
  action: IAction;
  context: IContext | string;
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

export interface IContext {
  time: string;
  isSubscriptionActive: boolean;
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
  resource: IResource;
  action: IAction;
  subject: ISubject;
  context: IContext | string;
}
