export type ChecksFormPayload = {
  request_id: string;
  subject: ISubject;
  context: IContext;
  evaluations: IEvaluation[];
};

export interface ISubject {
  type: string;
  id: string;
  source: string;
  properties: {
    isSuperUser: boolean;
  };
}

export interface IContext {
  time: string;
  isSubscriptionActive: boolean;
}

export interface IResource {
  type: string;
  id: string;
  properties: {
    isEnabled: boolean;
  };
}

export interface IAction {
  name: string;
  properties: {
    isEnabled: boolean;
  };
}

export interface IEvaluation {
  request_id: string;
  resource: IResource;
  action: IAction;
}
