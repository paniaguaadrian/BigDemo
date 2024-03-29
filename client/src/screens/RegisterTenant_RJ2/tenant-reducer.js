import { UPDATE_NEWTENANT_INFO } from "./tenant-constants";

export const DefaultTenant = {
  monthlyNetIncome: "",
  jobType: "",
  documentType: "",
  documentNumber: "",
  isAcceptedPrivacy: true,
  isRimboAccepted: true,
  stageOne: 5,
  isAllTenantsAccepted: true,
};

export const TenantReducer = (newTenant, { type, payload }) => {
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
