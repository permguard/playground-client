export const EXAMPLES = [
  {
    name: "ztmedflow",
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
        "type": "ZTMedFlow::Platform::BranchInfo",
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
    evaluations: `{
  "request_id": "abc1",
  "subject": {
    "type": "workload",
    "id": "platform-creator",
    "source": "keycloak",
    "properties": {
      "isSuperUser": true
    }
  },
  "resource": {
    "type": "ZTMedFlow::Platform::Subscription",
    "id": "e3a786fd07e24bfa95ba4341d3695ae8",
    "properties": {
      "isEnabled": true
    }
  },
  "action": {
    "name": "ZTMedFlow::Platform::Action::create",
    "properties": {
      "isEnabled": false
    }
  },
  "context": {
    "ip": "192.168.1.100",
    "location": "europe-west1"
  },
  "evaluations": [
    {
      "request_id": "exz1",
      "subject": {
        "type": "workload",
        "id": "platform-creator",
        "source": "keycloak",
        "properties": {
          "isSuperUser": true
        }
      },
      "context": {
        "time": "2025-01-23T16:17:46+00:00",
        "isSubscriptionActive": true
      },
      "resource": {
        "type": "ZTMedFlow::Platform::Subscription",
        "id": "e3a786fd07e24bfa95ba4341d3695ae8",
        "properties": {
          "isEnabled": true
        }
      },
      "action": {
        "name": "ZTMedFlow::Platform::Action::create",
        "properties": {
          "isEnabled": true
        }
      }
    },
    {
      "request_id": "exz2",
      "subject": {
        "type": "workload",
        "id": "platform-creator",
        "source": "keycloak",
        "properties": {
          "isSuperUser": true
        }
      },
      "context": {
        "time": "2025-01-23T16:17:46+00:00"
      },
      "resource": {
        "type": "ZTMedFlow::Platform::Subscription",
        "id": "e3a786fd07e24bfa95ba4341d3695ae8",
        "properties": {
          "isEnabled": true
        }
      },
      "action": {
        "name": "ZTMedFlow::Platform::Action::create",
        "properties": {
          "isEnabled": false
        }
      }
    }
  ]
}`,
  },
];
