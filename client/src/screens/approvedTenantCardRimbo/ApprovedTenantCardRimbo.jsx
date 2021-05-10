// React Components
import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Custom Components
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import Success from "../../components/Success/Success";
import PageContainer from "../../components/PageContainer/PageContainer";

// Multi language
import { withNamespaces } from "react-i18next";
// import i18n from "../../i18n";

// Reducer
import { TenantReducer, DefaultTenant } from "./approved_tenant_card-reducer";

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

const ApprovedTenantCardRimbo = ({ t }) => {
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
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}/card/approved`,
        body
      );

    // ! TENANCY: Simplply fetch tenancy Data.
    const fetchTenancyData = () =>
      axios.get(`${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCIES}`);

    // ! TENANCY: Add body to post decision. So we can send data. For tenancy
    const postTenancyDecision = (body) =>
      axios.post(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}/allTenantsCardAccepted`,
        body
      );

    const processDecision = async () => {
      // ! TENANT
      const { data: tenantData } = await fetchTenantData();

      const postBody = {
        isCardAccepted: tenant.isCardAccepted,
        randomID: tenantData.randomID,
      };

      const { data: decisionResult } = await postDecision(postBody);

      setState(decisionResult);

      const { tenantsName, tenantsEmail, tenantsLanguage } = tenantData;

      const tenantEmailData = {
        tenantsName,
        tenantsEmail,
      };

      if (!tenantData.isCardAccepted) {
        console.log(
          "This works? Sending email to tenant after acccepting credit cardd...!!!"
        );
        if (tenantsLanguage === "en") {
          await axios.post(
            `${REACT_APP_BASE_URL_EMAIL}/rj15/tt`,
            tenantEmailData
          );
        } else if (tenantsLanguage === "es") {
          await axios.post(
            `${REACT_APP_BASE_URL_EMAIL}/es/rj15/tt`,
            tenantEmailData
          );
        }
      }

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
            const thisONE = desiredTenancy[key].isCardAccepted;
            return thisONE;
          }
          // return isExist; // If i return isExist I see false on console
        })
        .filter((item) => item !== undefined)
        .every((x) => x);

      if (hasAccepted) {
        if (!desiredTenancy.isAllCardsAccepted) {
          const postTenancyBody = {
            isAllCardsAccepted: tenant.isAllCardsAccepted,
            tenancyID: desiredTenancy.tenancyID,
          };

          const { data: decisionTenancyResult } = await postTenancyDecision(
            postTenancyBody
          );

          const {
            agencyContactPerson,
            agencyEmailPerson,
            agencyName,
            agencyLanguage,
          } = desiredTenancy.agent;

          const tenancyID = desiredTenancy.tenancyID;

          // ! 1 tenant
          if (
            !desiredTenancy.tenantTwo &&
            !desiredTenancy.tenantThree &&
            !desiredTenancy.tenantFour
          ) {
            const { tenantsName } = desiredTenancy.tenant;
            const emailData = {
              agencyContactPerson,
              agencyEmailPerson,
              agencyName,
              tenancyID,
              tenantsName,
            };

            if (agencyLanguage === "en") {
              await axios.post(
                `${REACT_APP_BASE_URL_EMAIL}/rj15/pm`,
                emailData
              );
            } else if (agencyLanguage === "es") {
              await axios.post(
                `${REACT_APP_BASE_URL_EMAIL}/es/rj15/pm`,
                emailData
              );
            }
          }

          // ! 2 tenants
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
              agencyName,
              tenancyID,
              tenantsName,
              tenantsNameTwo,
            };

            if (agencyLanguage === "en") {
              await axios.post(
                `${REACT_APP_BASE_URL_EMAIL}/rj15/pm`,
                emailData
              );
            } else if (agencyLanguage === "es") {
              await axios.post(
                `${REACT_APP_BASE_URL_EMAIL}/es/rj15/pm`,
                emailData
              );
            }
          }

          // ! 3 tenants
          if (desiredTenancy.tenantThree && !desiredTenancy.tenantFour) {
            const { tenantsName } = desiredTenancy.tenant;
            const { tenantsName: tenantsNameTwo } = desiredTenancy.tenantTwo;
            const {
              tenantsName: tenantsNameThree,
            } = desiredTenancy.tenantThree;
            const emailData = {
              agencyContactPerson,
              agencyEmailPerson,
              agencyName,
              tenancyID,
              tenantsName,
              tenantsNameTwo,
              tenantsNameThree,
            };

            if (agencyLanguage === "en") {
              await axios.post(
                `${REACT_APP_BASE_URL_EMAIL}/rj15/pm`,
                emailData
              );
            } else if (agencyLanguage === "es") {
              await axios.post(
                `${REACT_APP_BASE_URL_EMAIL}/es/rj15/pm`,
                emailData
              );
            }
          }

          // ! 4 tenants
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
              agencyName,
              tenancyID,
              tenantsName,
              tenantsNameTwo,
              tenantsNameThree,
              tenantsNameFour,
            };

            if (agencyLanguage === "en") {
              await axios.post(
                `${REACT_APP_BASE_URL_EMAIL}/rj15/pm`,
                emailData
              );
            } else if (agencyLanguage === "es") {
              await axios.post(
                `${REACT_APP_BASE_URL_EMAIL}/es/rj15/pm`,
                emailData
              );
            }
          }

          setTenancyState(decisionTenancyResult);
        }
      }
    };

    processDecision();
  }, [randomID, tenancyID, tenant, randomIDSend]);

  return (
    <>
      <CustomHelmet header={t("approvedCardRimbo.helmet")} />
      <PageContainer>
        <Success
          title={t("approvedCardRimbo.title")}
          subtitle={t("approvedCardRimbo.subTitle")}
          imageSRC={SuccessImage}
          imageAlt="Success image"
        />
      </PageContainer>
    </>
  );
};

export default withNamespaces()(ApprovedTenantCardRimbo);
