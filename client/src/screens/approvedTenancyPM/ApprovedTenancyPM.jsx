// React components
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Reducer
import { TenancyReducer, DefaultTenancy } from "./approved_tenancy_pm-reducer";

// Custom Components
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import Success from "../../components/Success/Success";
import PageContainer from "../../components/PageContainer/PageContainer";

// Multi language
import { withNamespaces } from "react-i18next";

// Images
import SuccessImage from "../../images/success-image.svg";

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_BASE_URL_EMAIL,
} = process.env;

const ApprovedTenancyPM = ({ t }) => {
  let { tenancyID } = useParams();
  const randomID = tenancyID;

  const [tenancy] = useReducer(TenancyReducer, DefaultTenancy);
  const [state, setState] = useState(null); // eslint-disable-line

  useEffect(() => {
    const fetchTenancyData = () =>
      axios.get(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`
      );

    const postDecision = (body) =>
      axios.post(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}/pm/approved`,
        body
      );

    const processDecision = async () => {
      const { data: tenancyData } = await fetchTenancyData();

      const postBody = {
        isTenancyAcceptedByPM: tenancy.isTenancyAcceptedByPM,
        tenancyID: tenancyData.tenancyID,
      };

      const { data: decisionResult } = await postDecision(postBody);
      if (!tenancyData.isTenancyAcceptedByPM) {
        const {
          tenantsName,
          tenantsEmail,
          tenantsPhone,
          monthlyNetIncome,
          jobType,
          documentNumber,
          randomID,
          tenantsLanguage,
        } = tenancyData.tenant;
        const {
          agencyContactPerson,
          agencyEmailPerson,
          agencyName,
          agencyPhonePerson,
        } = tenancyData.agent;
        const {
          rentalAddress,
          rentalCity,
          rentalPostalCode,
        } = tenancyData.property;
        const {
          landlordName,
          landlordEmail,
          landlordPhone,
        } = tenancyData.landlord;
        const { rentAmount, product, rentDuration, tenancyID } = tenancyData;
        const emailData = {
          tenancyID,
          tenantsName,
          tenantsEmail,
          tenantsPhone,
          randomID,
          monthlyNetIncome,
          jobType,
          documentNumber,
          agencyContactPerson,
          agencyEmailPerson,
          agencyName,
          agencyPhonePerson,
          rentAmount,
          product,
          rentDuration,
          rentalAddress,
          rentalCity,
          rentalPostalCode,
          landlordName,
          landlordEmail,
          landlordPhone,
        };
        if (tenantsLanguage === "en") {
          axios.post(`${REACT_APP_BASE_URL_EMAIL}/rjpm`, emailData);
        } else if (tenantsLanguage === "es") {
          axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rjpm`, emailData);
        }
        // ! Tenant Two !
        if (tenancyData.tenantTwo) {
          const {
            tenantsName,
            tenantsEmail,
            tenantsPhone,
            tenantsLanguage,
            randomID,
          } = tenancyData.tenantTwo;
          const emailDataTwo = {
            tenancyID,
            monthlyNetIncome,
            jobType,
            documentNumber,
            agencyContactPerson,
            agencyEmailPerson,
            agencyName,
            agencyPhonePerson,
            rentAmount,
            product,
            rentDuration,
            rentalAddress,
            rentalCity,
            rentalPostalCode,
            landlordName,
            landlordEmail,
            landlordPhone,
            tenantsName,
            tenantsEmail,
            tenantsPhone,
            randomID,
          };
          if (tenantsLanguage === "en") {
            axios.post(`${REACT_APP_BASE_URL_EMAIL}/rjpm`, emailDataTwo);
          } else if (tenantsLanguage === "es") {
            axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rjpm`, emailDataTwo);
          }
        }
        // ! Tenant Three !
        if (tenancyData.tenantThree) {
          const {
            tenantsName,
            tenantsEmail,
            tenantsPhone,
            tenantsLanguage,
            randomID,
          } = tenancyData.tenantThree;
          const emailDataThree = {
            tenancyID,
            monthlyNetIncome,
            jobType,
            documentNumber,
            agencyContactPerson,
            agencyEmailPerson,
            agencyName,
            agencyPhonePerson,
            rentAmount,
            product,
            rentDuration,
            rentalAddress,
            rentalCity,
            rentalPostalCode,
            landlordName,
            landlordEmail,
            landlordPhone,
            tenantsName,
            tenantsEmail,
            tenantsPhone,
            randomID,
          };
          if (tenantsLanguage === "en") {
            axios.post(`${REACT_APP_BASE_URL_EMAIL}/rjpm`, emailDataThree);
          } else if (tenantsLanguage === "es") {
            axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rjpm`, emailDataThree);
          }
        }
        // ! Tenant Four !
        if (tenancyData.tenantFour) {
          const {
            tenantsName,
            tenantsEmail,
            tenantsPhone,
            tenantsLanguage,
            randomID,
          } = tenancyData.tenantFour;
          const emailDataFour = {
            tenancyID,
            monthlyNetIncome,
            jobType,
            documentNumber,
            agencyContactPerson,
            agencyEmailPerson,
            agencyName,
            agencyPhonePerson,
            rentAmount,
            product,
            rentDuration,
            rentalAddress,
            rentalCity,
            rentalPostalCode,
            landlordName,
            landlordEmail,
            landlordPhone,
            tenantsName,
            tenantsEmail,
            tenantsPhone,
            randomID,
          };
          if (tenantsLanguage === "en") {
            axios.post(`${REACT_APP_BASE_URL_EMAIL}/rjpm`, emailDataFour);
          } else if (tenantsLanguage === "es") {
            axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rjpm`, emailDataFour);
          }
        }
      }
      setState(decisionResult);
    };

    processDecision();
  }, [randomID, tenancy.isTenancyAcceptedByPM, tenancyID]);

  return (
    <>
      <CustomHelmet header={t("approvedTenancyPM.helmet")} />
      <PageContainer>
        <Success
          title={t("approvedTenancyPM.title")}
          subtitle={t("approvedTenancyPM.subTitle")}
          imageSRC={SuccessImage}
          imageAlt="Success image"
        />
      </PageContainer>
    </>
  );
};

export default withNamespaces()(ApprovedTenancyPM);
