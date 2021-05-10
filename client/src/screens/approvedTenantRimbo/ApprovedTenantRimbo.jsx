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
import { TenantReducer, DefaultTenant } from "./approved_tenant_rimbo-reducer";

// Images
import SuccessImage from "../../images/success-image.svg";

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_API_RIMBO_TENANCIES,
  REACT_APP_API_RIMBO_TENANT,
  REACT_APP_BASE_URL_EMAIL,
} = process.env;

const ApprovedTenantRimbo = ({ t }) => {
  let { tenancyID } = useParams();
  const randomID = tenancyID;
  const randomIDSend = tenancyID;
  const [tenant] = useReducer(TenantReducer, DefaultTenant);

  const [state, setState] = useState(null); // eslint-disable-line
  const [tenancyState, setTenancyState] = useState(null); // eslint-disable-line

  useEffect(() => {
    // ! TENANT: Simplify fetch tenant Data.
    const fetchTenantData = () =>
      axios.get(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}`
      );

    // ! TENANT: Add body to post decision. So we can send data. For tenant
    const postDecision = (body) =>
      axios.post(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}/approved`,
        body
      );

    // ! TENANCY: Simplply fetch tenancy Data.
    const fetchTenancyData = () =>
      axios.get(`${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCIES}`);

    // ! TENANCY: Add body to post decision. So we can send data. For tenancy
    const postTenancyDecision = (body) =>
      axios.post(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}/allTenantsAccepted`,
        body
      );

    const processDecision = async () => {
      // ! TENANT
      const { data: tenantData } = await fetchTenantData();

      const postBody = {
        isRimboAccepted: tenant.isRimboAccepted,
        randomID: tenantData.randomID,
      };

      const { data: decisionResult } = await postDecision(postBody);

      setState(decisionResult);

      // ! TENANCY (AFTER TENANT IS ALL ACCEPTED)

      const { data: tenancyData } = await fetchTenancyData();

      const tenants = ["tenant", "tenantTwo", "tenantThree", "tenantFour"];

      const getTenancy = (randomID) => {
        for (let tenancy of tenancyData) {
          for (let key in tenancy) {
            if (!tenants.includes(key)) continue;
            if (tenancy[key].randomID === randomID) return tenancy;
          }
        }
      };

      const desiredTenancy = getTenancy(randomID);

      const hasAccepted = Object.keys(desiredTenancy)
        // eslint-disable-next-line
        .map((key) => {
          const isExist = tenants.includes(key);
          if (isExist) {
            const thisONE = desiredTenancy[key].isRimboAccepted;
            return thisONE;
          }
          // return isExist; // If i return isExist I see false on console
        })
        .filter((item) => item !== undefined)
        .every((x) => x);

      if (hasAccepted) {
        if (!desiredTenancy.isAllTenantsAccepted) {
          const postTenancyBody = {
            isAllTenantsAccepted: tenant.isAllTenantsAccepted,
            tenancyID: desiredTenancy.tenancyID,
          };

          const { data: decisionTenancyResult } = await postTenancyDecision(
            postTenancyBody
          );

          const {
            agencyContactPerson,
            agencyEmailPerson,
            agencyLanguage,
          } = desiredTenancy.agent;

          const { rentalAddress } = desiredTenancy.property;

          const tenancyID = desiredTenancy.tenancyID;

          if (
            !desiredTenancy.tenantTwo &&
            !desiredTenancy.tenantThree &&
            !desiredTenancy.tenantFour
          ) {
            const { tenantsName } = desiredTenancy.tenant;
            const emailData = {
              agencyContactPerson,
              agencyEmailPerson,
              rentalAddress,
              tenancyID,
              tenantsName,
            };
            if (agencyLanguage === "en") {
              axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj11`, emailData);
            } else if (agencyLanguage === "es") {
              axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rj11`, emailData);
            }
          }

          if (
            desiredTenancy.tenantTwo &&
            !desiredTenancy.tenantThree &&
            !desiredTenancy.tenantFour
          ) {
            const { tenantsName } = desiredTenancy.tenant;
            const { tenantsName: tenantsNameTwo } = desiredTenancy.tenantTwo;
            const emailData = {
              agencyContactPerson,
              agencyEmailPerson,
              rentalAddress,
              tenancyID,
              tenantsName,
              tenantsNameTwo,
            };
            if (agencyLanguage === "en") {
              axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj11`, emailData);
            } else if (agencyLanguage === "es") {
              axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rj11`, emailData);
            }
          }

          if (desiredTenancy.tenantThree && !desiredTenancy.tenantFour) {
            const { tenantsName } = desiredTenancy.tenant;
            const { tenantsName: tenantsNameTwo } = desiredTenancy.tenantTwo;
            const {
              tenantsName: tenantsNameThree,
            } = desiredTenancy.tenantThree;
            const emailData = {
              agencyContactPerson,
              agencyEmailPerson,
              rentalAddress,
              tenancyID,
              tenantsName,
              tenantsNameTwo,
              tenantsNameThree,
            };
            if (agencyLanguage === "en") {
              axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj11`, emailData);
            } else if (agencyLanguage === "es") {
              axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rj11`, emailData);
            }
          }

          if (desiredTenancy.tenantFour) {
            const { tenantsName } = desiredTenancy.tenant;
            const { tenantsName: tenantsNameTwo } = desiredTenancy.tenantTwo;
            const {
              tenantsName: tenantsNameThree,
            } = desiredTenancy.tenantThree;
            const { tenantsName: tenantsNameFour } = desiredTenancy.tenantFour;
            const emailData = {
              agencyContactPerson,
              agencyEmailPerson,
              rentalAddress,
              tenancyID,
              tenantsName,
              tenantsNameTwo,
              tenantsNameThree,
              tenantsNameFour,
            };
            if (agencyLanguage === "en") {
              axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj11`, emailData);
            } else if (agencyLanguage === "es") {
              axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rj11`, emailData);
            }
          }
          setTenancyState(decisionTenancyResult);
        }
      }
    };

    processDecision();
  }, [
    tenancyID,
    randomID,
    randomIDSend,
    tenant.isAllTenantsAccepted,
    tenant.isRimboAccepted,
  ]);

  return (
    <>
      <CustomHelmet header={t("approvedTenantRimbo.helmet")} />
      <PageContainer>
        <Success
          title={t("approvedTenantRimbo.title")}
          subtitle={t("approvedTenantRimbo.subTitle")}
          imageSRC={SuccessImage}
          imageAlt="Success image"
        />
      </PageContainer>
    </>
  );
};

export default withNamespaces()(ApprovedTenantRimbo);
