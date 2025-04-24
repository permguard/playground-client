export const EXAMPLES = [
  {
    name: "magicfarmacia",
    ledger: `{
  "zone_id": 200365974321,
  "policy_store": {
    "kind": "ledger",
    "id": "89be7cf6c29142dba6a301cf47b98d1c"
  }
}`,
    principal: `{
  "type": "user",
  "id": "amy.smith@acmecorp.com",
  "source": "keycloak"
}`,
    entities: `{
  "schema": "cedar",
  "items": [
    {
      "uid": {
        "type": "MagicFarmacia::Platform::BranchInfo",
        "id": "subscription"
      },
      "attrs": {
        "active": true
      },
      "parents": []
    }
  ]
}`,
    server: `{
  "url": "localhost",
  "port": 9094
}`,
  },
];
