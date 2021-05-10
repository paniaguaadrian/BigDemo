// React Components
import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Styles
import classes from "./multi_step_form.module.scss";

// Validation
import { isLandlord, isLandlordEs } from "./validation";

// Constants
import { UPDATE_LANDLORD_INFO } from "./constants";

// Custom Components
import InputCheck from "../../components/InputCheck";
import Loader from "react-loader-spinner";

// Material-ui Components
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ButtonMat from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

// Material Icons
import LocalPhoneOutlinedIcon from "@material-ui/icons/LocalPhoneOutlined";
import PersonIcon from "@material-ui/icons/Person";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SendIcon from "@material-ui/icons/Send";

// nanoid
import { nanoid } from "nanoid";

// Multilanguage
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCIES,
  REACT_APP_BASE_URL_EMAIL,
} = process.env;

const LandlorDetails = ({ step, setStep, tenancy, setTenancy, t }) => {
  const [errors, setErrors] = useState({});
  const [isProcessing, setProcessingTo] = useState(false);

  // Scroll to top
  const optionsTop = {
    top: 0,
    behavior: "smooth",
  };

  // Handle on change
  const handleLandlord = ({ target }) => {
    setTenancy({
      type: UPDATE_LANDLORD_INFO,
      payload: { [target.name]: target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (i18n.language === "en") {
      const errors = isLandlord(tenancy.landlordDetails);
      setErrors(errors);
      if (Object.keys(errors).length > 0) return;
    } else {
      const errors = isLandlordEs(tenancy.landlordDetails);
      setErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }

    setProcessingTo(true);

    const randomID = nanoid();
    const randomIDTwo = nanoid();
    const randomIDThree = nanoid();
    const randomIDFour = nanoid();

    const agencyLanguage = i18n.language;

    const tenancyData = {
      // tenant
      tenantsName: tenancy.tenantDetails.tenantName,
      tenantsEmail: tenancy.tenantDetails.tenantEmail,
      tenantsPhone: tenancy.tenantDetails.tenantPhone,
      propertyManagerName: tenancy.agencyName,
      randomID: randomID,

      // tenantTwo
      tenantsNameTwo: tenancy.tenantDetails.tenantNameTwo,
      tenantsEmailTwo: tenancy.tenantDetails.tenantEmailTwo,
      tenantsPhoneTwo: tenancy.tenantDetails.tenantPhoneTwo,
      randomIDTwo: randomIDTwo,

      // tenantThree
      tenantsNameThree: tenancy.tenantDetails.tenantNameThree,
      tenantsEmailThree: tenancy.tenantDetails.tenantEmailThree,
      tenantsPhoneThree: tenancy.tenantDetails.tenantPhoneThree,
      randomIDThree: randomIDThree,

      // tenantThree
      tenantsNameFour: tenancy.tenantDetails.tenantNameFour,
      tenantsEmailFour: tenancy.tenantDetails.tenantEmailFour,
      tenantsPhoneFour: tenancy.tenantDetails.tenantPhoneFour,
      randomIDFour: randomIDFour,

      // agency, agent
      agencyName: tenancy.agencyName,
      agencyEmailPerson: tenancy.agencyEmailPerson,
      agencyContactPerson: tenancy.agencyContactPerson,
      agencyPhonePerson: tenancy.agencyPhonePerson,
      isAgentAccepted: tenancy.landlordDetails.isAgentAccepted,
      agencyLanguage: agencyLanguage,
      // property
      rentalCity: tenancy.propertyDetails.rentalCity,
      rentalPostalCode: tenancy.propertyDetails.rentalPostalCode,
      rentalAddress: tenancy.propertyDetails.rentalAddress,
      // landlord
      landlordName: tenancy.landlordDetails.landlordName,
      landlordEmail: tenancy.landlordDetails.landlordEmail,
      landlordPhone: tenancy.landlordDetails.landlordPhone,
      // tenancy
      product: tenancy.propertyDetails.product,
      rentDuration: tenancy.propertyDetails.rentDuration,
      rentAmount: tenancy.propertyDetails.rentAmount,
      tenancyID: randomID,
      // property manager
      PMName: tenancy.agencyName,
    };

    // Post DB
    await axios.post(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCIES}`,
      tenancyData
    );

    // TODO: Email action for tenant, and for PM (different cause language)

    // Email action
    if (i18n.language === "en") {
      await axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj1`, tenancyData);
    } else {
      await axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rj1`, tenancyData);
    }

    window.scrollTo(optionsTop);
    setStep(step + 1);
  };

  // Handle on previous
  const handlePrevious = (e) => {
    e.preventDefault();
    window.scrollTo(optionsTop);
    setStep(step - 1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.FormContainer}>
        <div className={classes.GroupInput}>
          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="landlordName"
              value={tenancy.landlordDetails.landlordName}
              label={t("RJ1.stepThree.landlordName")}
              placeholder={t("RJ1.stepThree.landlordNamePL")}
              onChange={(e) => handleLandlord(e)}
              className={classes.InputMaterial}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" disablePointerEvents={true}>
                    <PersonIcon className={classes.IconStyleMaterial} />
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText className={classes.ErrorTextMaterial}>
              {errors.landlordName}
            </FormHelperText>
          </div>
          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="landlordEmail"
              value={tenancy.landlordDetails.landlordEmail}
              label={t("RJ1.stepThree.landlordEmail")}
              placeholder={t("RJ1.stepThree.landlordEmailPL")}
              onChange={(e) => handleLandlord(e)}
              className={classes.InputMaterial}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" disablePointerEvents={true}>
                    <EmailOutlinedIcon className={classes.IconStyleMaterial} />
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText className={classes.ErrorTextMaterial}>
              {errors.landlordEmail}
            </FormHelperText>
          </div>
        </div>
        <div className={classes.GroupInputAlone}>
          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="landlordPhone"
              value={tenancy.landlordDetails.landlordPhone}
              label={t("RJ1.stepThree.landlordPhone")}
              placeholder={t("RJ1.stepThree.landlordPhonePL")}
              onChange={(e) => handleLandlord(e)}
              className={classes.InputMaterial}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" disablePointerEvents={true}>
                    <LocalPhoneOutlinedIcon
                      className={classes.IconStyleMaterial}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText className={classes.ErrorTextMaterial}>
              {errors.landlordPhone}
            </FormHelperText>
          </div>
        </div>

        <div className={classes.TermsContainer}>
          <InputCheck
            type="checkbox"
            required
            name="isAgentAccepted"
            id="terms"
            value={tenancy.landlordDetails.isAgentAccepted}
            placeholder="Accept our terms and conditions"
            onChange={(e) => handleLandlord(e)}
            error={errors.isAgentAccepted}
          />
          <p>
            {t("RJ1.stepThree.checkbox")}
            <a
              href="https://rimbo.rent/en/privacy-policy/"
              target="_blank"
              rel="noreferrer"
              className="link-tag"
            >
              {t("RJ1.stepThree.privacy")}
            </a>
            {t("RJ1.stepThree.checkboxTwo")}
            <a
              href="https://rimbo.rent/en/cookies-policy/"
              target="_blank"
              rel="noreferrer"
              className="link-tag"
            >
              {t("RJ1.stepThree.cookies")}
            </a>
            .
          </p>
        </div>
        <div className={classes.ButtonContainerMaterial}>
          <ButtonMat
            type="button"
            onClick={handlePrevious}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ChevronLeftIcon />}
          >
            {t("prevStepButton")}
          </ButtonMat>

          {isProcessing ? (
            <Loader
              type="Puff"
              color="#01d2cc"
              height={50}
              width={50}
              timeout={3000} //3 secs
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
  );
};

LandlorDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default withNamespaces()(LandlorDetails);
