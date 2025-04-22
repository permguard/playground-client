import { TFunction } from "i18next";

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9\-_]*[a-zA-Z0-9]$/;

export function validateLedger(ledger: any, t: TFunction): string | null {
  let errorMessage: string | null = null;

  function isValidName(name: string, entity: string): boolean {
    const isValid = NAME_REGEX.test(name);

    if (!isValid) {
      errorMessage = t(`ledger_invalid_${entity}_name`);
    }

    return isValid;
  }

  if (!ledger || typeof ledger !== "object" || !Array.isArray(ledger.domains)) {
    if (!errorMessage) {
      errorMessage = t("ledger_invalid_object_or_missing_properties");
    }

    return errorMessage;
  }

  const domainResourceNames: { [domainName: string]: Set<string> } = {};

  for (const domain of ledger.domains) {
    if (
      !domain ||
      typeof domain.name !== "string" ||
      !isValidName(domain.name, "domain") ||
      !Array.isArray(domain.resources)
    ) {
      if (!errorMessage) {
        errorMessage = t("ledger_invalid_domain_object_or_missing_properties");
      }

      return errorMessage;
    }

    domainResourceNames[domain.name] = new Set();

    for (const resource of domain.resources) {
      if (
        !resource ||
        typeof resource.name !== "string" ||
        !isValidName(resource.name, "resource") ||
        !Array.isArray(resource.actions)
      ) {
        if (!errorMessage) {
          errorMessage = t(
            "ledger_invalid_resource_object_or_missing_properties"
          );
        }

        return errorMessage;
      }

      if (domainResourceNames[domain.name].has(resource.name)) {
        errorMessage = t("ledger_duplicate_resource_name", {
          resource: resource.name,
          domain: domain.name,
        });

        return errorMessage;
      }

      domainResourceNames[domain.name].add(resource.name);

      for (const action of resource.actions) {
        if (
          !action ||
          typeof action.name !== "string" ||
          !isValidName(action.name, "action") ||
          typeof action.description !== "string"
        ) {
          if (!errorMessage) {
            errorMessage = t(
              "ledger_invalid_action_object_or_missing_properties"
            );
          }

          return errorMessage;
        }
      }
    }
  }

  return errorMessage;
}
