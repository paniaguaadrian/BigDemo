export const newTenant = (values) => {
  let errors = {};

  if (!values.monthlyNetIncome) {
    errors.monthlyNetIncome = "You must specify a monthly net";
  }
  if (values.jobType === "-1") {
    errors.jobType = "You must choose one job type";
  }
  if (values.documentType === "-1") {
    errors.documentType = "You must choose one document type";
  }
  if (!values.documentNumber) {
    errors.documentNumber = "You must specify a document number";
  }
  if (values.documentNumber && values.documentNumber.length < 8) {
    errors.documentNumber =
      "Your document number must be at least 8 characters";
  }

  if (!values.isAcceptedPrivacy) {
    errors.isAcceptedPrivacy = "You must accept our Privacy Policy";
  }
  return errors;
};

export const newTenantEs = (values) => {
  let errors = {};

  if (!values.monthlyNetIncome) {
    errors.monthlyNetIncome = "You must specify a monthly net";
  }
  if (values.jobType === "-1") {
    errors.jobType = "You must choose one job type";
  }
  if (values.documentType === "-1") {
    errors.documentType = "You must choose one document type";
  }
  if (!values.documentNumber) {
    errors.documentNumber = "You must specify a document number";
  }
  if (values.documentNumber && values.documentNumber.length < 8) {
    errors.documentNumber =
      "Your document number must be at least 8 characters";
  }

  if (!values.isAcceptedPrivacy) {
    errors.isAcceptedPrivacy = "You must accept our Privacy Policy";
  }
  return errors;
};
