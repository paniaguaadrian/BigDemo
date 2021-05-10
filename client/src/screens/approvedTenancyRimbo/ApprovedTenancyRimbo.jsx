// React components
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Custom Components
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import Success from "../../components/Success/Success";
import PageContainer from "../../components/PageContainer/PageContainer";

// Multi language
import { withNamespaces } from "react-i18next";

// Reducer
import { TenantReducer, DefaultTenant } from "./approved_tenancy_rimbo-reducer";

// Images
import SuccessImage from "../../images/success-image.svg";

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_BASE_URL_EMAIL,
} = process.env;

const ApprovedTenancyRimbo = ({ t }) => {
  let { tenancyID } = useParams();
  const randomID = tenancyID;

  const [tenant] = useReducer(TenantReducer, DefaultTenant);
  const [state, setState] = useState(null); // eslint-disable-line

  useEffect(() => {
    const fetchUserData = () =>
      axios.get(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`
      );

    const postDecision = (body) =>
      axios.post(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}/rimbo/start-service`,
        body
      );

    const processDecision = async () => {
      const { data: tenancyData } = await fetchUserData();

      const postBody = {
        rentStart: tenant.rentStart,
        tenancyID: tenancyData.tenancyID,
      };

      const { data: decisionResult } = await postDecision(postBody);
      if (!tenancyData.rentStart) {
        const {
          tenantsName,
          tenantsEmail,
          randomID,
          tenantsLanguage,
        } = tenancyData.tenant;
        const {
          agencyContactPerson,
          agencyEmailPerson,
          agencyLanguage,
        } = tenancyData.agent;
        const { rentalAddress } = tenancyData.property;
        const tenancyID = tenancyData.tenancyID;
        const emailData = {
          tenancyID,
          randomID,
          tenantsName,
          tenantsEmail,
          agencyContactPerson,
          agencyEmailPerson,
          rentalAddress,
        };
        if (tenantsLanguage === "en") {
          axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj18tt`, emailData);
        } else if (tenantsLanguage === "es") {
          axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rj18tt`, emailData);
        }
        if (agencyLanguage === "en") {
          axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj18pm`, emailData);
        } else if (agencyLanguage === "es") {
          axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rj18pm`, emailData);
        }
        // ! Tenant Two
        if (tenancyData.tenantTwo) {
          const {
            tenantsName,
            tenantsEmail,
            randomID,
            tenantsLanguage,
          } = tenancyData.tenantTwo;
          const { agencyContactPerson, agencyEmailPerson } = tenancyData.agent;
          const { rentalAddress } = tenancyData.property;
          const tenancyID = tenancyData.tenancyID;
          const emailData = {
            tenancyID,
            randomID,
            tenantsName,
            tenantsEmail,
            agencyContactPerson,
            agencyEmailPerson,
            rentalAddress,
          };
          if (tenantsLanguage === "en") {
            axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj18tt`, emailData);
          } else if (tenantsLanguage === "es") {
            axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rj18tt`, emailData);
          }
        }
        // ! Tenant Three
        if (tenancyData.tenantThree) {
          const {
            tenantsName,
            tenantsEmail,
            tenantsLanguage,
            randomID,
          } = tenancyData.tenantThree;
          const { agencyContactPerson, agencyEmailPerson } = tenancyData.agent;
          const { rentalAddress } = tenancyData.property;
          const tenancyID = tenancyData.tenancyID;
          const emailData = {
            tenancyID,
            randomID,
            tenantsName,
            tenantsEmail,
            agencyContactPerson,
            agencyEmailPerson,
            rentalAddress,
          };
          if (tenantsLanguage === "en") {
            axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj18tt`, emailData);
          } else if (tenantsLanguage === "es") {
            axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rj18tt`, emailData);
          }
        }
        // ! Tenant Four
        if (tenancyData.tenantFour) {
          const {
            tenantsName,
            tenantsEmail,
            tenantsLanguage,
            randomID,
          } = tenancyData.tenantFour;
          const { agencyContactPerson, agencyEmailPerson } = tenancyData.agent;
          const { rentalAddress } = tenancyData.property;
          const tenancyID = tenancyData.tenancyID;
          const emailData = {
            tenancyID,
            randomID,
            tenantsName,
            tenantsEmail,
            agencyContactPerson,
            agencyEmailPerson,
            rentalAddress,
          };
          if (tenantsLanguage === "en") {
            axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj18tt`, emailData);
          } else if (tenantsLanguage === "es") {
            axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rj18tt`, emailData);
          }
        }
      }
      setState(decisionResult);
    };

    processDecision();
  }, [randomID, tenant.rentStart, tenancyID]);

  return (
    <>
      <CustomHelmet header={t("approvedTenancyRimbo.helmet")} />
      <PageContainer>
        <Success
          title={t("approvedTenancyRimbo.title")}
          subtitle={t("approvedTenancyRimbo.subTitle")}
          imageSRC={SuccessImage}
          imageAlt="Success image"
        />
      </PageContainer>
    </>
  );
};

export default withNamespaces()(ApprovedTenancyRimbo);
