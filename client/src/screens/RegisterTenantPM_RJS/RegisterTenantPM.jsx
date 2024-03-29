// React Components
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Styles
import classes from "./rjs_tetnant.module.scss";

// Custom Components
import Input from "../../components/Input";
import InputFile from "../../components/InputFile";
import Loader from "react-loader-spinner";
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import Success from "../../components/Success/Success";

// Material-ui Components
import ButtonMat from "@material-ui/core/Button";

// Material-ui Icons
import SendIcon from "@material-ui/icons/Send";

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

const RegisterTenantPM = ({ t }) => {
  const { tenancyID } = useParams();

  const [isProcessing, setProcessingTo] = useState(false);
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);

  const [responseData, setResponseData] = useState([]); // eslint-disable-line
  const [loading, setLoading] = useState(false); //eslint-disable-line
  const [err, setErr] = useState(null); //eslint-disable-line

  const [sent, isSent] = useState(false);

  const [date, setDate] = useState("");
  const [files, setFiles] = useState({
    pmAnex: null,
  });

  // Scroll to top
  const optionsTop = {
    top: 0,
    behavior: "smooth",
  };

  useEffect(() => {
    const getData = () => {
      fetch(`${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!" + res.status);
          }
          return res.json();
        })
        .then(
          (responseData) => {
            setResponseData(responseData);
            setLoading(true);
          },
          (err) => {
            setErr(err);
            setLoading(true);
          }
        );
    };
    getData();
  }, [tenancyID]);

  const changeHandler = (event) => {
    const name = event.target.name;
    setFiles((files) => {
      const newFiles = { ...files };
      newFiles[name] = event.target.files[0];
      return newFiles;
    });
  };

  const changeHandlerr = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isSent(false);
    setProcessingTo(true);

    const formData = new FormData();
    for (const key in files) {
      formData.append(key, files[key]);
    }
    formData.append("date", date);
    formData.append("tenancyID", tenancyID);

    // ! POST to RIMBO_API => DB
    await axios.post(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`,
      formData
    );

    isSent(true);
    setIsSuccessfullySubmitted(true);
    window.scrollTo(optionsTop);
  };

  useEffect(() => {
    const fetchUserData = () =>
      axios.get(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`
      );
    const processDecision = async () => {
      const { data: tenancyData } = await fetchUserData();
      const {
        agencyName,
        agencyContactPerson,
        agencyEmailPerson,
        agencyLanguage,
      } = tenancyData.agent;
      const { tenantsName, tenantsEmail, randomID, tenantsLanguage } =
        tenancyData.tenant;
      const { rentalAddress } = tenancyData.property;
      const tenancyID = tenancyData.tenancyID;

      const emailData = {
        agencyName,
        agencyContactPerson,
        agencyEmailPerson,
        agencyLanguage,
        tenantsName,
        tenantsEmail,
        randomID,
        tenantsLanguage,
        rentalAddress,
        tenancyID,
      };

      const sendAttachments = async () => {
        if (sent) {
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
            const { tenantsName, tenantsEmail, randomID, tenantsLanguage } =
              tenancyData.tenantTwo;
            const { agencyContactPerson, agencyEmailPerson } =
              tenancyData.agent;
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
            const { tenantsName, tenantsEmail, tenantsLanguage, randomID } =
              tenancyData.tenantThree;
            const { agencyContactPerson, agencyEmailPerson } =
              tenancyData.agent;
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
            const { tenantsName, tenantsEmail, tenantsLanguage, randomID } =
              tenancyData.tenantFour;
            const { agencyContactPerson, agencyEmailPerson } =
              tenancyData.agent;
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
      };
      sendAttachments();
    };
    processDecision();
  }, [sent, tenancyID]);

  return (
    <>
      <CustomHelmet header={t("RJS.helmet")} />
      {!isSuccessfullySubmitted ? (
        <div className={classes.PageContainer}>
          <div className={classes.HeaderContainer}>
            <h1>{t("RJS.header.title")}</h1>
            <h1>{t("RJS.header.titleTwo")}</h1>
            <div className={classes.HeaderInfo}>
              <p>{t("RJS.header.subTitle")}</p>
            </div>
          </div>
          <div className={classes.FormContent}>
            <form
              onSubmit={handleSubmit}
              className="classes.RegisterForm"
              encType="multipart/form-data"
            >
              <div className={classes.FormContainer}>
                <div className={classes.GroupInput}>
                  <div className={classes.InputElement}>
                    <Input
                      type="date"
                      name="date"
                      value={date}
                      label={t("RJS.form.rentalStart")}
                      onChange={changeHandlerr}
                      required
                    />
                  </div>
                  <div className={classes.InputElement}>
                    <InputFile
                      type="file"
                      name="File"
                      label={t("RJS.form.rentalAgreement")}
                      onChange={changeHandler}
                      required
                    />
                  </div>
                </div>

                <div className={classes.ButtonContainer}>
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
                      disabled={isProcessing}
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={<SendIcon />}
                    >
                      {t("submitButton")}
                    </ButtonMat>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={classes.PageContainer}>
          <Success
            title={t("RJS.success.title")}
            subtitle={t("RJS.success.subtitle")}
            imageSRC={SuccessImage}
            imageAlt="Success image"
          />
        </div>
      )}
    </>
  );
};

export default withNamespaces()(RegisterTenantPM);
