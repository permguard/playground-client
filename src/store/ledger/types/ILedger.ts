export interface ILedger {
  name: string;
  iam: string;
  code: string;
}

export interface ILedgerCode {
  ledger_id: string;
  name: string;
  tag: string;
  account_id: number;
  domains: IDomain[];
}

export interface IDomain {
  domain_id: string;
  name: string;
  resources: IResource[];
}

export interface IResource {
  resource_id: string;
  name: string;
  actions: {
    action_id: string;
    name: string;
    description: string;
  }[];
}
