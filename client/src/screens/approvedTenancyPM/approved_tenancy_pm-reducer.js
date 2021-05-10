import { UPDATE_TENANCY_PM_APPROVED } from "./approved_tenancy_pm-constants";

export const DefaultTenancy = {
  isTenancyAcceptedByPM: true,
  isPMRejected: true,
};

export const TenancyReducer = (newTenant, { type, payload }) => {
  switch (type) {
    case UPDATE_TENANCY_PM_APPROVED:
      return {
        ...newTenant,
        ...payload,
      };

    default:
      return newTenant;
  }
};
