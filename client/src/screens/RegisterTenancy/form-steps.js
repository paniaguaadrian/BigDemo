// React Components
import React from "react";

// Custom Components
import AgencyDetails from "./agency-details";
import TenantDetails from "./tenant-details";
import PropertyDetails from "./property-details";
import LandlordDetails from "./landlord-details";
import Completed from "./completed";

const FormSteps = (step, setStep, tenancy, setTenancy) => [
  {
    title: "Real State Agency",
    titleEs: "Datos de la inmobiliaria",
    content: (
      <AgencyDetails
        setStep={setStep}
        step={step}
        tenancy={tenancy}
        setTenancy={setTenancy}
      />
    ),
  },
  {
    title: "Tenant Information",
    titleEs: "Datos del inquilino",
    content: (
      <TenantDetails
        setStep={setStep}
        step={step}
        tenancy={tenancy}
        setTenancy={setTenancy}
      />
    ),
  },
  {
    title: "Apartment Details",
    titleEs: "Datos del apartamento",
    content: (
      <PropertyDetails
        setStep={setStep}
        step={step}
        tenancy={tenancy}
        setTenancy={setTenancy}
      />
    ),
  },
  {
    title: "Landlord Information",
    titleEs: "Datos del propietario",
    content: (
      <LandlordDetails
        setStep={setStep}
        step={step}
        tenancy={tenancy}
        setTenancy={setTenancy}
      />
    ),
  },
  {
    title: "Listing Complete",
    titleEs: "Registro completado",
    content: <Completed tenancy={tenancy} />,
  },
];

export default FormSteps;
