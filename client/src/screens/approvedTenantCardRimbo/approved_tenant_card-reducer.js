import { UPDATE_NEWTENANT_CARD_APPROVED } from "./approved_tenant_card-constants";

export const DefaultTenant = {
  isAllCardsAccepted: true,
  isCardAccepted: true,
};

export const TenantReducer = (newTenant, { type, payload }) => {
  switch (type) {
    case UPDATE_NEWTENANT_CARD_APPROVED:
      return {
        ...newTenant,
        ...payload,
      };

    default:
      return newTenant;
  }
};
