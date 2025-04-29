export interface ILabelValue<T = string> {
  label: string;
  value: T;
}

export interface AuthorizationModel {
  zone_id: number;
  policy_store: {
    kind: string;
    id: string;
  };
  principal: {
    type: string;
    id: string;
    source: string;
  };
  entities: {
    schema: string;
    items: EntityItem[];
  };
}

export interface EntityItem {
  uid: {
    type: string;
    id: string;
  };
  attrs: {
    active: boolean;
    [key: string]: unknown; // in case more attributes are added
  };
  parents: unknown[]; // specify type if you know the structure
}

export interface Subject {
  type: string;
  id: string;
  source: string;
  properties: {
    isSuperUser: boolean;
    [key: string]: unknown; // in case more properties exist
  };
}

export interface Context {
  time: string; // ISO 8601 date string
  isSubscriptionActive: boolean;
  [key: string]: unknown;
}

export interface Evaluation {
  request_id: string;
  resource: {
    type: string;
    id: string;
    properties: {
      isEnabled: boolean;
      [key: string]: unknown;
    };
  };
  action: {
    name: string;
    properties: {
      isEnabled: boolean;
      [key: string]: unknown;
    };
  };
}

export interface IRequestJSON {
  authorization_model: AuthorizationModel;
  request_id: string;
  subject: Subject;
  context: Context;
  evaluations: Evaluation[];
}

export type NestedNullable<T> = {
  [P in keyof T]?: T[P] extends object
    ? NestedNullable<T[P]>
    : T[P] | undefined;
};
