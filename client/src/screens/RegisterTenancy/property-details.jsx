// React Components
import React, { useState } from "react";
import PropTypes from "prop-types";

// Material-ui Components
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ButtonMat from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

// Material Icons
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import MarkunreadMailboxIcon from "@material-ui/icons/MarkunreadMailbox";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import Card from "@material-ui/core/Card";

// Styles
import classes from "./multi_step_form.module.scss";

// Validation
import { isProperty, isPropertyEs } from "./validation";

// Constants reducer
import { UPDATE_PROPERTY_INFO } from "./constants";

// Multilanguage
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

// Google Maps Autocomplete
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

const PropertyDetails = ({ step, setStep, tenancy, setTenancy, t }) => {
  const [errors, setErrors] = useState({});

  const [rentalAddress, setRentalAddress] = useState("");
  const [rentalCity, setRentalCity] = useState("");
  const [rentalPostalCode, setRentalPostalCode] = useState("");

  // Scroll to top
  const optionsTop = {
    top: 0,
    behavior: "smooth",
  };

  // Google Maps Address and Zip Code
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
      tenancy.propertyDetails.rentalPostalCode = "";
      tenancy.propertyDetails.rentalAddress = results[0].formatted_address;
      setRentalPostalCode("");
      setRentalAddress(results[0].formatted_address);
      setRentalCity(results[0].address_components[1].long_name);
    } else if (
      addressComponents[0].types[0] === streetNumber && // number
      addressComponents[1].types[0] === route && // Street
      addressComponents[2].types[0] === locality && // Barcelona
      addressComponents[6].types[0] === postalCode
    ) {
      tenancy.propertyDetails.rentalPostalCode =
        results[0].address_components[6].long_name;
      tenancy.propertyDetails.rentalAddress = results[0].formatted_address;
      tenancy.propertyDetails.rentalCity =
        results[0].address_components[2].long_name;

      const street = results[0].address_components[1].long_name;
      const streetNumber = results[0].address_components[0].long_name;
      const finalAddress = `${street}, ${streetNumber}`;

      setRentalPostalCode(results[0].address_components[6].long_name);
      setRentalAddress(finalAddress);
      setRentalCity(results[0].address_components[2].long_name);
      tenancy.propertyDetails.rentalAddress = finalAddress;
    }
  };

  // Handle on change
  const handleAgency = ({ target }) => {
    setTenancy({
      type: UPDATE_PROPERTY_INFO,
      payload: { [target.name]: target.value },
    });
  };

  // Hanlde con next / continue
  const handleContinue = (e) => {
    e.preventDefault();
    if (i18n.laanguage === "en") {
      const errors = isProperty(tenancy.propertyDetails);
      setErrors(errors);
      if (Object.keys(errors).length > 0) return;
    } else {
      const errors = isPropertyEs(tenancy.propertyDetails);
      setErrors(errors);
      if (Object.keys(errors).length > 0) return;
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
    <form onSubmit={handleContinue}>
      <div className={classes.FormContainer}>
        <div className={classes.GroupInput}>
          <div className={classes.InputElementMaterial}>
            <FormControl variant="outlined" className={classes.InputMaterial}>
              <InputLabel id="select_label">
                {t("RJ1.stepTwo.service")}
              </InputLabel>
              <Select
                labelId="select_label"
                id="select_label"
                required
                value={tenancy.propertyDetails.product}
                name="product"
                onChange={(e) => handleAgency(e)}
                displayEmpty
                label={t("RJ1.stepTwo.service")}
              >
                <MenuItem name="product" value={t("RJ1.stepTwo.serviceOne")}>
                  {t("RJ1.stepTwo.serviceOne")}
                </MenuItem>
                <MenuItem name="product" value={t("RJ1.stepTwo.serviceTwo")}>
                  {t("RJ1.stepTwo.serviceTwo")}
                </MenuItem>
                <MenuItem name="product" value={t("RJ1.stepTwo.serviceThree")}>
                  {t("RJ1.stepTwo.serviceThree")}
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="rentDuration"
              value={tenancy.propertyDetails.rentDuration}
              label={t("RJ1.stepTwo.rentDuration")}
              placeholder={t("RJ1.stepTwo.rentDurationPL")}
              onChange={(e) => handleAgency(e)}
              className={classes.InputMaterial}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" disablePointerEvents={true}>
                    <AccessTimeIcon className={classes.IconStyleMaterial} />
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText className={classes.ErrorTextMaterial}>
              {errors.rentDuration}
            </FormHelperText>
          </div>
        </div>
        <div className={classes.GroupInput}>
          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="rentAmount"
              value={tenancy.propertyDetails.rentAmount}
              label={t("RJ1.stepTwo.rentAmount")}
              placeholder={t("RJ1.stepTwo.rentAmountPL")}
              onChange={(e) => handleAgency(e)}
              className={classes.InputMaterial}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" disablePointerEvents={true}>
                    <EuroSymbolIcon className={classes.IconStyleMaterial} />
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText className={classes.ErrorTextMaterial}>
              {errors.rentAmount}
            </FormHelperText>
          </div>

          <div className={classes.InputElementMaterial}>
            <PlacesAutocomplete
              value={rentalAddress}
              onChange={setRentalAddress}
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
                    label={t("RJ1.stepTwo.rentalAddress")}
                    placeholder={t("RJ1.stepTwo.rentalAddressPL")}
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
                  <Card raised className={classes.GoogleSuggestionContainer}>
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
        </div>
        <div className={classes.GroupInput}>
          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="rentalCity"
              value={rentalCity}
              label={t("RJ1.stepTwo.rentalCity")}
              placeholder={t("RJ1.stepTwo.rentalCityPL")}
              onChange={setRentalCity}
              onSelect={handleSelect}
              className={classes.InputMaterial}
              fullWidth
              disabled
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" disablePointerEvents={true}>
                    <LocationCityIcon className={classes.IconStyleMaterial} />
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText className={classes.ErrorTextMaterial}>
              {errors.tenantName}
            </FormHelperText>
          </div>

          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="rentalPostalCode"
              value={rentalPostalCode}
              label={t("RJ1.stepTwo.rentalPostalCode")}
              placeholder={t("RJ1.stepTwo.rentalPostalCodePL")}
              onChange={setRentalPostalCode}
              onSelect={handleSelect}
              disabled
              className={classes.InputMaterial}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" disablePointerEvents={true}>
                    <MarkunreadMailboxIcon
                      className={classes.IconStyleMaterial}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText className={classes.ErrorTextMaterial}>
              {errors.tenantName}
            </FormHelperText>
          </div>
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
          <ButtonMat
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ChevronRightIcon />}
          >
            {t("nextStepButton")}
          </ButtonMat>
        </div>
      </div>
    </form>
  );
};

PropertyDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default withNamespaces()(PropertyDetails);
