import { UPDATE_NEWTENANT_INFO } from "./tenantStripe-constants";

export const DefaultTenant = {
  isTrying: true,
  isAcceptedGC: true,
};

export const TenantStripeReducer = (newTenant, { type, payload }) => {
  switch (type) {
    case UPDATE_NEWTENANT_INFO:
      return {
        ...newTenant,
        ...payload,
      };

    default:
      return newTenant;
  }
};
