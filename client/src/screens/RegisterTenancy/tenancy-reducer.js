import {
  UPDATE_TENANCY_INFO,
  UPDATE_TENANT_INFO,
  UPDATE_PROPERTY_INFO,
  UPDATE_LANDLORD_INFO,
  DELETE_TENANTTWO_INFO,
  DELETE_TENANTTHREE_INFO,
  DELETE_TENANTFOUR_INFO,
} from "./constants";

export const DefaultTenancy = {
  agencyName: "",
  agencyEmailPerson: "",
  agencyContactPerson: "",
  agencyPhonePerson: "",
  tenancyID: "",

  tenantDetails: {
    tenantName: "",
    tenantPhone: "",
    tenantEmail: "",

    tenantNameTwo: "",
    tenantPhoneTwo: "",
    tenantEmailTwo: "",

    tenantNameThree: "",
    tenantPhoneThree: "",
    tenantEmailThree: "",

    tenantNameFour: "",
    tenantPhoneFour: "",
    tenantEmailFour: "",
  },
  propertyDetails: {
    rentalCity: "",
    rentalPostalCode: "",
    rentalAddress: "",
    rentAmount: "",
    rentDuration: "",
    product: "",
  },
  landlordDetails: {
    landlordName: "",
    landlordEmail: "",
    landlordPhone: "",
    isAgentAccepted: true,
  },
};

export const TenancyReducer = (tenancy, { type, payload }) => {
  switch (type) {
    case UPDATE_TENANCY_INFO:
      return {
        ...tenancy,
        ...payload,
      };

    case UPDATE_TENANT_INFO:
      return {
        ...tenancy,
        tenantDetails: {
          ...tenancy.tenantDetails,
          ...payload,
        },
      };

    case DELETE_TENANTTWO_INFO:
      return {
        ...tenancy,
        tenantDetails: {
          ...tenancy.tenantDetails,
          tenantNameTwo: "",
          tenantPhoneTwo: "",
          tenantEmailTwo: "",
        },
      };

    case DELETE_TENANTTHREE_INFO:
      return {
        ...tenancy,
        tenantDetails: {
          ...tenancy.tenantDetails,
          tenantNameThree: "",
          tenantPhoneThree: "",
          tenantEmailThree: "",
        },
      };

    case DELETE_TENANTFOUR_INFO:
      return {
        ...tenancy,
        tenantDetails: {
          ...tenancy.tenantDetails,
          tenantNameFour: "",
          tenantPhoneFour: "",
          tenantEmailFour: "",
        },
      };

    case UPDATE_PROPERTY_INFO:
      return {
        ...tenancy,
        propertyDetails: {
          ...tenancy.propertyDetails,
          ...payload,
        },
      };

    case UPDATE_LANDLORD_INFO:
      return {
        ...tenancy,
        landlordDetails: {
          ...tenancy.landlordDetails,
          ...payload,
        },
      };

    default:
      return tenancy;
  }
};
