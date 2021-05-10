export const isAgency = (values) => {
  let errors = {};
  if (!values.agencyName) {
    errors.agencyName = "Agency name is required";
  }
  if (!values.agencyEmailPerson) {
    errors.agencyEmailPerson = "Agency email address is required";
  } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.agencyEmailPerson = "Email address is invalid";
  }
  if (!values.agencyContactPerson) {
    errors.agencyContactPerson = "Contact person name is required";
  }
  if (!values.agencyPhonePerson) {
    errors.agencyPhonePerson = "Phone number is required";
  }
  if (values.agencyPhonePerson && values.agencyPhonePerson.length < 9) {
    errors.agencyPhonePerson = "Enter valid phone number";
  }
  return errors;
};

export const isAgencyEs = (values) => {
  let errors = {};
  if (!values.agencyName) {
    errors.agencyName = "Se requiere el nombre de la agencia";
  }
  if (!values.agencyEmailPerson) {
    errors.agencyEmailPerson = "Escribe el correo electrónico";
  } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.agencyEmailPerson = "El correo electrónico no es válido";
  }
  if (!values.agencyContactPerson) {
    errors.agencyContactPerson = "Añade el nombre de la persona de contacto";
  }
  if (!values.agencyPhonePerson) {
    errors.agencyPhonePerson = "Escribe el teléfono";
  }
  if (values.agencyPhonePerson && values.agencyPhonePerson.length < 9) {
    errors.agencyPhonePerson = "Escribe un número de teléfono válido";
  }
  return errors;
};

export const isTenant = (values) => {
  let errors = {};
  if (!values.tenantName) {
    errors.tenantName = "Tenant name is required";
  }
  if (!values.tenantPhone) {
    errors.tenantPhone = "Phone number is required";
  }
  if (values.tenantPhone && values.tenantPhone.length < 9) {
    errors.tenantPhone = "Enter valid phone number";
  }
  if (!values.tenantEmail) {
    errors.tenantEmail = "Tenant email address is required";
  } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.tenantEmail = "Email address is invalid";
  }
  return errors;
};

export const isTenantEs = (values) => {
  let errors = {};
  if (!values.tenantName) {
    errors.tenantName = "Escribe el nombre del inquilino";
  }
  if (!values.tenantPhone) {
    errors.tenantPhone = "Escribe el número de teléfono";
  }
  if (values.tenantPhone && values.tenantPhone.length < 9) {
    errors.tenantPhone = "Introduce un número de teléfono válido";
  }
  if (!values.tenantEmail) {
    errors.tenantEmail = "Escribre la dirección de correo electrónico";
  } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.tenantEmail = "El correo electrónico no es válido";
  }
  return errors;
};

export const isProperty = (values) => {
  let errors = {};

  if (!values.rentDuration) {
    errors.rentDuration = "Enter a rental duration (in years).";
  }
  if (!values.rentalCity) {
    errors.rentalCity = "City Name is required.";
  }
  if (!values.rentalPostalCode) {
    errors.rentalPostalCode = "Postal Code is required.";
  }
  if (values.rentalPostalCode && values.rentalPostalCode.length < 5) {
    errors.rentalPostalCode = "Enter valid Postal Code.";
  }
  if (!values.rentAmount) {
    errors.rentAmount = "Monthly Rent is required.";
  }
  if (!values.rentalAddress) {
    errors.rentalAddress = "Rental Address is required.";
  }
  return errors;
};

export const isPropertyEs = (values) => {
  let errors = {};

  if (!values.rentDuration) {
    errors.rentDuration = "Enter a rental duration (in years).";
  }
  if (!values.rentalCity) {
    errors.rentalCity = "City Name is required.";
  }
  if (!values.rentalPostalCode) {
    errors.rentalPostalCode = "Postal Code is required.";
  }
  if (values.rentalPostalCode && values.rentalPostalCode.length < 5) {
    errors.rentalPostalCode = "Enter valid Postal Code.";
  }
  if (!values.rentAmount) {
    errors.rentAmount = "Monthly Rent is required.";
  }
  if (!values.rentalAddress) {
    errors.rentalAddress = "Rental Address is required.";
  }
  return errors;
};

export const isLandlord = (values) => {
  let errors = {};
  if (!values.landlordName) {
    errors.landlordName = "Landlord name is required.";
  }
  if (!values.landlordEmail) {
    errors.landlordEmail = "Landlord email address is required";
  } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.landlordEmail = "Email address is invalid";
  }
  if (!values.landlordPhone) {
    errors.landlordPhone = "Phone number is required";
  }
  if (values.landlordPhone && values.landlordPhone.length < 9) {
    errors.landlordPhone = "Enter valid phone number";
  }
  if (!values.isAgentAccepted) {
    errors.isAgentAccepted = "You must accept our Terms and Conditions";
  }
  return errors;
};

export const isLandlordEs = (values) => {
  let errors = {};
  if (!values.landlordName) {
    errors.landlordName = "Escribe el nombre del propietario";
  }
  if (!values.landlordEmail) {
    errors.landlordEmail = "Escribre la dirección de correo electrónico";
  } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.landlordEmail = "El correo electrónico no es válido";
  }
  if (!values.landlordPhone) {
    errors.landlordPhone = "Escribe el número de teléfono";
  }
  if (values.landlordPhone && values.landlordPhone.length < 9) {
    errors.landlordPhone = "Introduce un número de teléfono válido";
  }
  if (!values.isAgentAccepted) {
    errors.isAgentAccepted = "You must accept our Terms and Conditions";
  }
  return errors;
};
