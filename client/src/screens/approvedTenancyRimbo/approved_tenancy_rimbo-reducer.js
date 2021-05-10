import { UPDATE_NEWTENANT_RIMBO_APPROVED } from "./approved_tenancy_rimbo-constants";

export const DefaultTenant = {
  rentStart: true,
};

export const TenantReducer = (newTenant, { type, payload }) => {
  switch (type) {
    case UPDATE_NEWTENANT_RIMBO_APPROVED:
      return {
        ...newTenant,
        ...payload,
      };

    default:
      return newTenant;
  }
};
