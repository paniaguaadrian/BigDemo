// React components
import React, { useEffect, useReducer, useState } from "react";
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
import CancelImage from "../../images/undraw_cancel_u1it.svg";

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCIES,
  REACT_APP_API_RIMBO_TENANT,
  REACT_APP_BASE_URL_EMAIL,
} = process.env;

const RejectedTenancyPM = ({ t }) => {
  let { tenancyID } = useParams();
  const randomID = tenancyID;
  const randomIDSend = tenancyID;

  const [tenancy] = useReducer(TenancyReducer, DefaultTenancy);
  const [state, setState] = useState(null); // eslint-disable-line

  useEffect(() => {
    // ! TENANT: Simplify fetch tenant Data.
    const fetchTenantData = () =>
      axios.get(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}`
      );

    // ! TENANCY: Simplply fetch tenancy Data.
    const fetchTenancyData = () =>
      axios.get(`${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCIES}`);

    // ! Post to tenant the new state of the isPMRejected
    const postDecision = (body) =>
      axios.post(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}/pm/rejected`,
        body
      );

    const processDecision = async () => {
      const { data: tenantData } = await fetchTenantData();
      const { data: tenancyData } = await fetchTenancyData();

      const postBody = {
        isPMRejected: tenancy.isPMRejected,
        randomID: tenantData.randomID,
      };

      const { data: decisionResult } = await postDecision(postBody);

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

      const { tenantsName, randomIDSend } = tenantData;

      const {
        agencyName,
        agencyContactPerson,
        agencyEmailPerson,
      } = desiredTenancy.agent;

      const { rentalAddress } = desiredTenancy.property;

      const tenancyID = desiredTenancy.tenancyID;

      const emailData = {
        tenantsName,
        agencyName,
        agencyContactPerson,
        agencyEmailPerson,
        rentalAddress,
        tenancyID,
        randomID: randomIDSend,
      };

      if (!tenantData.isPMRejected) {
        axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj13`, emailData);
      }

      setState(decisionResult);
    };

    processDecision();
  }, [tenancyID, randomID, randomIDSend, tenancy.isPMRejected]);
  return (
    <>
      <CustomHelmet header={t("rejectedTenancyPM.helmet")} />
      <PageContainer>
        <Success
          title={t("rejectedTenancyPM.title")}
          subtitle={t("rejectedTenancyPM.subTitle")}
          imageSRC={CancelImage}
          imageAlt="Rejected image"
        />
      </PageContainer>
    </>
  );
};

export default withNamespaces()(RejectedTenancyPM);
