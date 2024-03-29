// React Components
import React, { useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TenantReducer, DefaultTenant } from "./tenant-reducer";

// Styles
import classes from "./rj2_tenant.module.scss";

// Images
import SuccessImage from "../../images/success-image.svg";

// Validation
import { newTenant, newTenantEs } from "./tenant_validation";

// Constants
import { UPDATE_NEWTENANT_INFO } from "./tenant-constants";

// Custom Components
import InputCheck from "../../components/InputCheck";
import InputFile from "../../components/InputFile";
import Loader from "react-loader-spinner";
import Success from "../../components/Success/Success";
import CustomHelmet from "../../components/Helmet/CustomHelmet";

// Material-ui Components
import {
  TextField,
  InputAdornment,
  MenuItem,
  FormHelperText,
  FormControl,
  Button as ButtonMat,
  Select,
  InputLabel,
} from "@material-ui/core";

// Material-ui Icons
import {
  EuroSharp as EuroSharpIcon,
  AssignmentIndSharp as AssignmentIndSharpIcon,
  EditLocation as EditLocationIcon,
  MarkunreadMailbox as MarkunreadMailboxIcon,
  LocationOn as LocationOnIcon,
  Send as SendIcon,
} from "@material-ui/icons";

// Multilanguage
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

// Google Maps Autocomplete
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { Card } from "@material-ui/core";

const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_API_RIMBO_TENANCIES,
  REACT_APP_API_RIMBO_TENANT,
  REACT_APP_BASE_URL_EMAIL,
} = process.env;

const RegisterTenant = ({ t }) => {
  let { tenancyID } = useParams();
  const randomID = tenancyID;

  // Reducer
  const [tenant, setTenant] = useReducer(TenantReducer, DefaultTenant);

  // State
  const [errors, setErrors] = useState({});
  const [isProcessing, setProcessingTo] = useState(false);
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
  const [sent, isSent] = useState(false); // eslint-disable-line
  const [tenancyState, setTenancyState] = useState(null); // eslint-disable-line
  const [files, setFiles] = useState({
    DF: null,
    DB: null,
    DCA: null,
  });
  const [tenantsAddress, setTenantsAddress] = useState("");
  const [tenantsZipCode, setTenantsZipCode] = useState("");

  const tenantsLanguage = i18n.language;

  // Scroll to top (styling)
  const optionsTop = {
    top: 0,
    behavior: "smooth",
  };

  // Google Maps functionality
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);

    const addressComponents = results[0].address_components;

    const route = "route";
    const locality = "locality";
    const streetNumber = "street_number";
    const postalCode = "postal_code";

    if (
      addressComponents[0].types[0] === route &&
      addressComponents[1].types[0] === locality
    ) {
      setTenantsZipCode("");
      setTenantsAddress(results[0].formatted_address);
    } else if (
      addressComponents[0].types[0] === streetNumber && // number
      addressComponents[1].types[0] === route && // Street
      addressComponents[2].types[0] === locality && // Barcelona
      addressComponents[6].types[0] === postalCode
    ) {
      const street = results[0].address_components[1].long_name;
      const streetNumber = results[0].address_components[0].long_name;
      const city = results[0].address_components[2].long_name;
      const finalAddress = `${street}, ${streetNumber}, ${city}`;

      setTenantsZipCode(results[0].address_components[6].long_name);
      setTenantsAddress(finalAddress);
    }
  };

  // Helper functions
  const fetchTenantData = () =>
    axios.get(`${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}`);

  const fetchTenancyData = () =>
    axios.get(`${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCIES}`);

  const postTenancyDecision = (body) =>
    axios.post(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}/allTenantsAccepted`,
      body
    );

  const handleNewTenant = ({ target }) => {
    setTenant({
      type: UPDATE_NEWTENANT_INFO,
      payload: { [target.name]: target.value },
    });
  };

  const changeHandler = (event) => {
    const name = event.target.name;
    setFiles((files) => {
      const newFiles = { ...files };
      newFiles[name] = event.target.files[0];
      return newFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isSent(false);

    // Call our tenant fetch function
    const { data: tenantData } = await fetchTenantData();

    const formData = new FormData();
    for (const key in files) {
      formData.append(key, files[key]);
    }
    formData.append("randomID", randomID);

    if (i18n.language === "en") {
      const errors = newTenant(tenant);
      setErrors(errors);
      if (Object.keys(errors).length > 0) return;
      setProcessingTo(true);
    } else {
      const errors = newTenantEs(tenant);
      setErrors(errors);
      if (Object.keys(errors).length > 0) return;
      setProcessingTo(true);
    }

    // Post to Rimbo API (tenant files/images)
    await axios.post(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}/upload`,
      formData,
      { randomID }
    );

    // Post to Rimbo API Data (tenant data)
    await axios.post(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/bigdemo/${randomID}`,
      {
        monthlyNetIncome: tenant.monthlyNetIncome,
        jobType: tenant.jobType,
        documentType: tenant.documentType,
        documentNumber: tenant.documentNumber,
        tenantsAddress: tenantsAddress,
        tenantsZipCode: tenantsZipCode,
        isAcceptedPrivacy: tenant.isAcceptedPrivacy,
        stageOne: tenant.stageOne,
        randomID: tenancyID,
        tenantsLanguage: tenantsLanguage,
        isRimboAccepted: tenant.isRimboAccepted,
      }
    );

    // Tenant Email action
    if (i18n.language === "en") {
      await axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj2/tt`, {
        tenantsName: tenantData.tenantsName,
        tenantsEmail: tenantData.tenantsEmail,
      });
    } else if (i18n.language === "es") {
      await axios.post(`${REACT_APP_BASE_URL_EMAIL}/es/rj2/tt`, {
        tenantsName: tenantData.tenantsName,
        tenantsEmail: tenantData.tenantsEmail,
      });
    }

    setIsSuccessfullySubmitted(true);
    isSent(true);
    window.scrollTo(optionsTop);

    const processDecision = async () => {
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

          const { agencyContactPerson, agencyEmailPerson, agencyLanguage } =
            desiredTenancy.agent;

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
            const { tenantsName: tenantsNameThree } =
              desiredTenancy.tenantThree;
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
            const { tenantsName: tenantsNameThree } =
              desiredTenancy.tenantThree;
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
  };

  return (
    <>
      <CustomHelmet header={t("RJ2.helmet")} />
      {!isSuccessfullySubmitted ? (
        <div className={classes.PageContainer}>
          <div className={classes.HeaderContainer}>
            <h1>{t("RJ2.header.title")}</h1>
            <h1>{t("RJ2.header.titleTwo")}</h1>
            <div className={classes.HeaderInfo}>
              <p>{t("RJ2.header.extraInfo")}</p>
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
                  <div className={classes.InputElementMaterial}>
                    <TextField
                      type="text"
                      name="monthlyNetIncome"
                      value={tenant.monthlyNetIncome}
                      label={t("RJ2.form.monthlyNetIncome")}
                      placeholder={t("RJ2.form.monthlyNetIncomePL")}
                      onChange={(e) => handleNewTenant(e)}
                      className={classes.InputMaterial}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            disablePointerEvents={true}
                          >
                            <EuroSharpIcon
                              className={classes.IconStyleMaterial}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText className={classes.ErrorTextMaterial}>
                      {errors.monthlyNetIncome}
                    </FormHelperText>
                  </div>
                  <div className={classes.InputElementMaterial}>
                    <FormControl
                      variant="outlined"
                      className={classes.InputMaterial}
                    >
                      <InputLabel id="select_label">
                        {t("RJ2.form.jobType")}
                      </InputLabel>
                      <Select
                        labelId="select_label"
                        id="select_label"
                        required
                        value={tenant.jobType}
                        name="jobType"
                        onChange={(e) => handleNewTenant(e)}
                        displayEmpty
                        label={t("RJ1.stepTwo.service")}
                      >
                        <MenuItem
                          name="jobType"
                          value={t("RJ2.form.jobTypeOne")}
                        >
                          {t("RJ2.form.jobTypeOne")}
                        </MenuItem>
                        <MenuItem
                          name="jobType"
                          value={t("RJ2.form.jobTypeTwo")}
                        >
                          {t("RJ2.form.jobTypeTwo")}
                        </MenuItem>
                        <MenuItem
                          name="jobType"
                          value={t("RJ2.form.jobTypeThree")}
                        >
                          {t("RJ2.form.jobTypeThree")}
                        </MenuItem>
                        <MenuItem
                          name="jobType"
                          value={t("RJ2.form.jobTypeFour")}
                        >
                          {t("RJ2.form.jobTypeFour")}
                        </MenuItem>
                        <MenuItem
                          name="jobType"
                          value={t("RJ2.form.jobTypeFive")}
                        >
                          {t("RJ2.form.jobTypeFive")}
                        </MenuItem>
                        <MenuItem
                          name="jobType"
                          value={t("RJ2.form.jobTypeSix")}
                        >
                          {t("RJ2.form.jobTypeSix")}
                        </MenuItem>
                        <MenuItem
                          name="jobType"
                          value={t("RJ2.form.jobTypeSeven")}
                        >
                          {t("RJ2.form.jobTypeSeven")}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className={classes.GroupInput}>
                  <div className={classes.InputElementMaterial}>
                    <FormControl
                      variant="outlined"
                      className={classes.InputMaterial}
                    >
                      <InputLabel id="select_label">
                        {t("RJ2.form.documentType")}
                      </InputLabel>

                      <Select
                        labelId="select_label"
                        id="select_label"
                        required
                        value={tenant.documentType}
                        name="documentType"
                        onChange={(e) => handleNewTenant(e)}
                        displayEmpty
                        label={t("RJ2.form.documentType")}
                      >
                        <MenuItem
                          name="documentType"
                          value={t("RJ2.form.documentTypeOne")}
                        >
                          {t("RJ2.form.documentTypeOne")}
                        </MenuItem>
                        <MenuItem
                          name="documentType"
                          value={t("RJ2.form.documentTypeTwo")}
                        >
                          {t("RJ2.form.documentTypeTwo")}
                        </MenuItem>
                        <MenuItem
                          name="documentType"
                          value={t("RJ2.form.documentTypeThree")}
                        >
                          {t("RJ2.form.documentTypeThree")}
                        </MenuItem>
                        <MenuItem
                          name="documentType"
                          value={t("RJ2.form.documentTypeFour")}
                        >
                          {t("RJ2.form.documentTypeFour")}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className={classes.InputElementMaterial}>
                    <TextField
                      type="text"
                      name="documentNumber"
                      value={tenant.documentNumber}
                      label={t("RJ2.form.documentNumber")}
                      placeholder={t("RJ2.form.documentNumberPL")}
                      onChange={(e) => handleNewTenant(e)}
                      className={classes.InputMaterial}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            disablePointerEvents={true}
                          >
                            <AssignmentIndSharpIcon
                              className={classes.IconStyleMaterial}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText className={classes.ErrorTextMaterial}>
                      {errors.documentNumber}
                    </FormHelperText>
                  </div>
                </div>
                <div className={classes.GroupInput}>
                  <div className={classes.InputElementMaterial}>
                    <PlacesAutocomplete
                      value={tenantsAddress}
                      onChange={setTenantsAddress}
                      onSelect={handleSelect}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => (
                        <div>
                          <TextField
                            id="googleInput"
                            {...getInputProps()}
                            type="text"
                            label={t("RJ2.form.tenantsAddress")}
                            placeholder={t("RJ2.form.tenantsAddressPL")}
                            className={classes.InputMaterial}
                            fullWidth
                            variant="outlined"
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  disablePointerEvents={true}
                                >
                                  <EditLocationIcon
                                    className={classes.IconStyleMaterial}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <Card
                            raised
                            className={classes.GoogleSuggestionContainer}
                          >
                            {/* display sugestions */}
                            {loading ? <div>...loading</div> : null}
                            {suggestions.map((suggestion, place) => {
                              const style = {
                                backgroundColor: suggestion.active
                                  ? "#24c4c48f"
                                  : "#fff",
                                cursor: "pointer",
                              };
                              return (
                                <div
                                  className={classes.GoogleSuggestion}
                                  {...getSuggestionItemProps(suggestion, {
                                    style,
                                  })}
                                  key={place}
                                >
                                  <LocationOnIcon />
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </Card>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </div>
                  <div className={classes.InputElementMaterial}>
                    <TextField
                      type="text"
                      name="tenantsZipCode"
                      value={tenantsZipCode}
                      label={t("RJ2.form.tenantsZipCode")}
                      placeholder={t("RJ2.form.tenantsZipCodePL")}
                      onChange={setTenantsZipCode}
                      disabled
                      className={classes.InputMaterial}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            disablePointerEvents={true}
                          >
                            <MarkunreadMailboxIcon
                              className={classes.IconStyleMaterial}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>

                <div className={classes.GroupInput}>
                  <div className={classes.InputElementMaterial}>
                    <InputFile
                      type="file"
                      name="DF"
                      label={t("RJ2.form.DNIFront")}
                      onChange={changeHandler}
                      required
                    />
                  </div>
                  <div className={classes.InputElementMaterial}>
                    <InputFile
                      type="file"
                      name="DB"
                      label={t("RJ2.form.DNIBack")}
                      onChange={changeHandler}
                      required
                    />
                  </div>
                </div>
                <div className={classes.GroupInputAloneFile}>
                  <div className={classes.InputElementMaterial}>
                    <InputFile
                      type="file"
                      name="DCA"
                      label={t("RJ2.form.DCA")}
                      onChange={changeHandler}
                      required
                    />
                  </div>
                </div>
                <div className={classes.TermsContainer}>
                  <InputCheck
                    type="checkbox"
                    required
                    name="isAcceptedPrivacy"
                    id="terms"
                    value={tenant.isAcceptedPrivacy}
                    // placeholder={t("RJ2.form.monthlyNetIncome")}
                    onChange={(e) => handleNewTenant(e)}
                    error={errors.isAcceptedPrivacy}
                  />
                  <p>
                    {t("RJ2.form.checkbox")}
                    <a
                      href="https://rimbo.rent/en/privacy-policy/"
                      target="_blank"
                      rel="noreferrer"
                      className="link-tag"
                    >
                      {t("RJ2.form.privacy")}
                    </a>
                    {t("RJ2.form.checkboxTwo")}
                    <a
                      href="https://rimbo.rent/en/cookies-policy/"
                      target="_blank"
                      rel="noreferrer"
                      className="link-tag"
                    >
                      {t("RJ2.form.cookies")}
                    </a>
                    {t("RJ2.form.checkboxThree")}
                  </p>
                </div>
                <div className={classes.ButtonContainerMaterial}>
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
            title={t("RJ2.success.title")}
            subtitle={t("RJ2.success.subtitle")}
            imageSRC={SuccessImage}
            imageAlt="Success image"
          />
        </div>
      )}
    </>
  );
};

export default withNamespaces()(RegisterTenant);
