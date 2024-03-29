// React Components
import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Custom Components
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import Success from "../../components/Success/Success";

// Material-ui Components
import ButtonMat from "@material-ui/core/Button";

// Material-ui Icons
import SendIcon from "@material-ui/icons/Send";

// Reducer & constants
import { TenantStripeReducer, DefaultTenant } from "./tenantStripe-reducer";
import { UPDATE_NEWTENANT_INFO } from "./tenantStripe-constants";

// Stripe Components
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// Multi language
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

// Images
import StripeLogo from "../../images/secure-payments.png";
import SuccessImage from "../../images/success-image.svg";

// Styles
import Loader from "react-loader-spinner";
import classes from "./rj3_tenant.module.scss";
import "./CardSection.css";
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "14px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_API_RIMBO_TENANCIES,
  REACT_APP_API_RIMBO_TENANT,
  REACT_APP_BASE_URL_STRIPE,
  REACT_APP_API_RIMBO_TENANT_STRIPE,
  REACT_APP_BASE_URL_EMAIL,
} = process.env;

const RegisterTenantCard = ({ t }) => {
  let { randomID } = useParams();
  const tenancyID = randomID;

  const [tenant, setTenant] = useReducer(TenantStripeReducer, DefaultTenant);

  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const [tenantData, setTenantData] = useState([]);
  const [tenancyData, setTenancyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tenancyState, setTenancyState] = useState(null); // eslint-disable-line

  // Scroll to top
  const optionsTop = {
    top: 0,
    behavior: "smooth",
  };

  useEffect(() => {
    // ! TENANT: Simplify fetch tenant Data.
    const fetchTenantData = () =>
      axios.get(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}`
      );

    // ! TENANCY: Simplply fetch tenancy Data.
    const fetchTenancyData = (finalTenancyID) =>
      axios.get(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${finalTenancyID}`
      );

    const processDecision = async () => {
      const { data: tenantData } = await fetchTenantData();
      const finalTenancyID = tenantData.tenancyID;
      setTenantData(tenantData);
      const { data: tenancyData } = await fetchTenancyData(finalTenancyID);
      setTenancyData(tenancyData);
    };
    processDecision();
    setLoading(false);
  }, [randomID]);

  // Handle on change
  const handleNewTenant = ({ target }) => {
    setTenant({
      type: UPDATE_NEWTENANT_INFO,
      payload: { [target.name]: target.value },
    });
  };

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    const tenantsEmail = document.getElementById("email").value;
    const tenantsName = document.getElementById("name").value;
    const tenantsPhone = document.getElementById("phone").value;
    const timestamps = new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");

    const cardElement = elements.getElement("card");

    setProcessingTo(true);

    try {
      // ! Stripe action
      const { data: client_secret } = await axios.post(
        `${REACT_APP_BASE_URL_STRIPE}/card-wallet`,
        {
          tenantsName,
          tenantsEmail,
        }
      );

      const { error } = await stripe.confirmCardSetup(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: tenantsName,
            email: tenantsEmail,
            phone: tenantsPhone,
          },
        },
      });

      if (error) {
        setCheckoutError("* Rellena todos los campos del formulario.");
        setProcessingTo(false);
        return;
      } else {
        setIsSuccessfullySubmitted(true);

        // ! post a nuestra BDD
        await axios.post(
          `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT_STRIPE}/bigdemo/${randomID}`,
          {
            isTrying: tenant.isTrying,
            isAcceptedGC: tenant.isAcceptedGC,
            isCardAccepted: tenant.isCardAccepted,
            randomID: randomID,
          }
        );

        // ! Post to Email service (email to tenant)
        if (i18n.language === "en") {
          await axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj15/tt`, {
            tenantsName,
            tenantsEmail,
            tenantsPhone,
            timestamps,
            agencyEmailPerson: tenancyData.agent.agencyEmailPerson,
            agencyContactPerson: tenancyData.agent.agencyContactPerson,
            agencyName: tenancyData.agent.agencyName,
            rentalAddress: tenancyData.property.rentalAddress,
            randomID,
            tenancyID,
          });
        } else {
          await axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rj15/tt`, {
            tenantsName,
            tenantsEmail,
            tenantsPhone,
            timestamps,
            agencyEmailPerson: tenancyData.agent.agencyEmailPerson,
            agencyContactPerson: tenancyData.agent.agencyContactPerson,
            agencyName: tenancyData.agent.agencyName,
            rentalAddress: tenancyData.property.rentalAddress,
            randomID,
            tenancyID,
          });
        }

        // ! Poner aqui la condicion de que no envie el email hasta que ambos tenants han puesto su tarjeta (email to pm)

        const fetchTenancyData = () =>
          axios.get(`${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCIES}`);

        const postTenancyDecision = (body) =>
          axios.post(
            `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${desiredTenancy.tenancyID}/allTenantsCardAccepted`,
            body
          );

        const { data: tenancyDataDemo } = await fetchTenancyData();
        console.log(tenancyDataDemo);

        const tenants = ["tenant", "tenantTwo", "tenantThree", "tenantFour"];

        const getTenancy = (randomID) => {
          for (let tenancy of tenancyDataDemo) {
            for (let key in tenancy) {
              if (!tenants.includes(key)) continue;
              if (tenancy[key].randomID === randomID) return tenancy;
            }
          }
        };

        const desiredTenancy = getTenancy(randomID);
        console.log(desiredTenancy);

        const hasAccepted = Object.keys(desiredTenancy)
          // eslint-disable-next-line
          .map((key) => {
            const isExist = tenants.includes(key);
            if (isExist) {
              const thisONE = desiredTenancy[key].isCardAccepted;
              return thisONE;
            }
          })
          .filter((item) => item !== undefined)
          .every((x) => x);

        console.log(hasAccepted);

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
              const { tenantsName: tenantsNameThree } =
                desiredTenancy.tenantThree;
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
              const { tenantsName: tenantsNameThree } =
                desiredTenancy.tenantThree;
              const { tenantsName: tenantsNameFour } =
                desiredTenancy.tenantFour;
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
      }
    } catch (err) {
      setCheckoutError(err.message);
    }
    window.scrollTo(optionsTop);
  };

  return (
    <>
      <CustomHelmet header={t("RJ3.helmet")} />
      {!isSuccessfullySubmitted ? (
        <div className={classes.PageContainer}>
          {loading ? (
            <div className={classes.HeaderContainer}>
              <Loader
                type="Puff"
                color="#01d2cc"
                height={200}
                width={200}
                timeout={3000} //3 secs
              />
            </div>
          ) : (
            <>
              <div className={classes.HeaderContainer}>
                <h1>{t("RJ3.header.title")}</h1>
                <div className={classes.HeaderInfo}>
                  <h2>{t("RJ3.header.subtitle")}</h2>
                </div>
              </div>
              <div className={classes.CardContainer}>
                <form onSubmit={handleFormSubmit}>
                  <div className={classes.CardLeft}>
                    <h3>{t("RJ3.form.tenantTitle")}</h3>
                    <div className={classes.CardLeftInput}>
                      <h4>{t("RJ3.form.name")}</h4>
                      <input
                        id="name"
                        type="text"
                        value={tenantData.tenantsName}
                        disabled
                      />
                    </div>
                    <div className={classes.CardLeftInput}>
                      <h4>{t("RJ3.form.email")}</h4>
                      <input
                        id="email"
                        type="text"
                        value={tenantData.tenantsEmail}
                        disabled
                      />
                    </div>
                    <div className={classes.CardLeftInput}>
                      <h4>{t("RJ3.form.phone")}</h4>
                      <input
                        id="phone"
                        type="text"
                        value={tenantData.tenantsPhone}
                        disabled
                      />
                    </div>
                    <div className={classes.CardLeftInfo}>
                      <p>{t("RJ3.form.cardSubtitle")}</p>
                    </div>
                  </div>
                  <div className={classes.CardRight}>
                    <h3>{t("RJ3.form.cardTitle")}</h3>
                    <label>
                      <CardElement
                        options={CARD_ELEMENT_OPTIONS}
                        onChange={handleCardDetailsChange}
                      />
                    </label>
                    <div className={classes.ErrorInput}>
                      <p className="error-message">{checkoutError}</p>
                    </div>
                    <div>
                      <img
                        src={StripeLogo}
                        alt="Stripe Security Payment Logo"
                      />
                    </div>
                    <div className={classes.CardRightInfo}>
                      <p>
                        {t("RJ3.form.extraInfo")}
                        <span>
                          <b>
                            {tenancyData.product}
                            {t("RJ3.form.extraInfoTwo")}
                          </b>
                        </span>
                      </p>
                    </div>
                    <div className={classes.TermsContainer}>
                      <input
                        type="checkbox"
                        required
                        name="isAcceptedGC"
                        id="terms"
                        value={tenant.isAcceptedGC}
                        onChange={(e) => handleNewTenant(e)}
                      />
                      <p>
                        {t("RJ3.form.checkbox")}
                        <a
                          href="https://rimbo.rent/politica-privacidad/"
                          target="_blank"
                          rel="noreferrer"
                          className="link-tag"
                        >
                          {t("RJ3.form.generalConditions")}
                        </a>
                      </p>
                    </div>

                    {isProcessing ? (
                      <Loader
                        type="Puff"
                        color="#01d2cc"
                        height={50}
                        width={50}
                        timeout={6000} //3 secs
                      />
                    ) : (
                      <ButtonMat
                        disabled={isProcessing || !stripe}
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<SendIcon />}
                      >
                        {t("authorizeTwo")}
                      </ButtonMat>
                    )}
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={classes.PageContainer}>
          <Success
            title={t("RJ3.success.title")}
            subtitle={t("RJ3.success.subtitle")}
            imageSRC={SuccessImage}
            imageAlt="Success image"
          />
        </div>
      )}
    </>
  );
};

export default withNamespaces()(RegisterTenantCard);
