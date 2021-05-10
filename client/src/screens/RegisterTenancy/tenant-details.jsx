// React Components
import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "../../components/Button"; //eslint-disable-line

// Material-ui Components
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ButtonMat from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

// Material Icons
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import PersonIcon from "@material-ui/icons/Person";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LocalPhoneOutlinedIcon from "@material-ui/icons/LocalPhoneOutlined";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";

// Styles
import classes from "./multi_step_form.module.scss";

// Validation
import { isTenant, isTenantEs } from "./validation";

// Constants Reducer
import {
  UPDATE_TENANT_INFO,
  DELETE_TENANTTWO_INFO,
  DELETE_TENANTTHREE_INFO,
  DELETE_TENANTFOUR_INFO,
} from "./constants";

// Multilanguage
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

const TenantDetails = ({ step, setStep, tenancy, setTenancy, t }) => {
  const [errors, setErrors] = useState({});
  const [showButtonTwo, setShowButtonTwo] = useState(true);
  const [showButtonThree, setShowButtonThree] = useState(true);
  const [showButtonFour, setShowButtonFour] = useState(true);

  const [showDeleteTwo, setShowDeleteTwo] = useState(true);
  const [showDeleteThree, setShowDeleteThree] = useState(true);
  const [showDeleteFour, setShowDeleteFour] = useState(true); //eslint-disable-line

  const [showTenantTwoForm, setShowTenantTwoForm] = useState(false);
  const [showTenantThreeForm, setShowTenantThreeForm] = useState(false);
  const [showTenantFourForm, setShowTenantFourForm] = useState(false);

  // Scroll to top
  const optionsTop = {
    top: 0,
    behavior: "smooth",
  };

  // ! Add tenant Two
  // Toggle button to show Tenant 2 form
  const handleTenantTwo = (e) => {
    e.preventDefault();
    setShowTenantTwoForm(true);
    setShowButtonTwo(false);
    window.scrollTo(0, document.body.scrollHeight);
  };
  // Button to delete Tenant 2 form / Data
  const deleteTenantTwo = (e) => {
    e.preventDefault();
    setShowTenantTwoForm(false);
    setShowButtonTwo(true);
    setTenancy({
      type: DELETE_TENANTTWO_INFO,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ! Add tenant Three
  // Toggle button to show Tenant 3 form
  const handleTenantThree = (e) => {
    e.preventDefault();
    setShowTenantThreeForm(true);
    setShowButtonThree(false);
    setShowDeleteTwo(false);
    window.scrollTo(0, document.body.scrollHeight);
  };
  // Button to delete Tenant 3 form / Data
  const deleteTenantThree = (e) => {
    e.preventDefault();
    setShowTenantThreeForm(false);
    setShowButtonThree(true);
    setShowDeleteTwo(true);
    setTenancy({
      type: DELETE_TENANTTHREE_INFO,
    });
    window.scrollTo({
      top: 150,
      behavior: "smooth",
    });
  };

  // ! Add tenant Four
  // Toggle button to show Tenant 4 form
  const handleTenantFour = (e) => {
    e.preventDefault();
    setShowTenantFourForm(true);
    setShowButtonFour(false);
    setShowDeleteThree(false);
    window.scrollTo(0, document.body.scrollHeight);
  };
  // Button to delete Tenant 4 form / Data
  const deleteTenantFour = (e) => {
    e.preventDefault();
    setShowTenantFourForm(false);
    setShowButtonFour(true);
    setShowDeleteThree(true);
    setTenancy({
      type: DELETE_TENANTFOUR_INFO,
    });
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

  // Handle on change
  const handleTenant = ({ target }) => {
    setTenancy({
      type: UPDATE_TENANT_INFO,
      payload: { [target.name]: target.value },
    });
  };

  // Hanlde con next / continue
  const handleContinue = (e) => {
    e.preventDefault();
    if (i18n.language === "en") {
      const errors = isTenant(tenancy.tenantDetails);
      setErrors(errors);
      if (Object.keys(errors).length > 0) return;
    } else {
      const errors = isTenantEs(tenancy.tenantDetails);
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

  // Button to show tenant 2 form
  let buttonTwo = null;
  if (showButtonTwo) {
    buttonTwo = (
      <div className={classes.ButtonContainerMaterial}>
        <ButtonMat
          type="button"
          onClick={handleTenantTwo}
          variant="contained"
          color="primary"
          size="large"
          endIcon={<GroupAddIcon />}
        >
          {t("addTenant")}
        </ButtonMat>
      </div>
    );
  }
  // Delete button to tenant 2 form
  let deleteButtonTwo = null;
  if (showDeleteTwo) {
    deleteButtonTwo = (
      <div className={classes.InputAddDeleteButton}>
        <ButtonMat
          type="button"
          onClick={deleteTenantTwo}
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<HighlightOffOutlinedIcon />}
        >
          {t("deleteTenant")}
        </ButtonMat>
      </div>
    );
  }

  // Button to show tenant 3 form
  let buttonThree = null;
  if (showButtonThree) {
    buttonThree = (
      <div className={classes.InputAddDeleteButton}>
        <ButtonMat
          type="button"
          onClick={handleTenantThree}
          variant="contained"
          color="primary"
          size="large"
          endIcon={<GroupAddIcon />}
        >
          {t("addTenant")}
        </ButtonMat>
      </div>
    );
  }
  // Delete button to tenant 3 form
  let deleteButtonThree = null;
  if (showDeleteThree) {
    deleteButtonThree = (
      <div className={classes.InputAddDeleteButton}>
        <ButtonMat
          type="button"
          onClick={deleteTenantThree}
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<HighlightOffOutlinedIcon />}
        >
          {t("deleteTenant")}
        </ButtonMat>
      </div>
    );
  }

  // Button to show tenant 4 form
  let buttonFour = null;
  if (showButtonFour) {
    buttonFour = (
      <div className={classes.InputAddDeleteButton}>
        <ButtonMat
          type="button"
          onClick={handleTenantFour}
          variant="contained"
          color="primary"
          size="large"
          endIcon={<GroupAddIcon />}
        >
          {t("addTenant")}
        </ButtonMat>
      </div>
    );
  }
  // Delete button to tenant 3 form
  let deleteButtonFour = null;
  if (showDeleteFour) {
    deleteButtonFour = (
      <div className={classes.InputAddDeleteButton}>
        <ButtonMat
          type="button"
          onClick={deleteTenantFour}
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<HighlightOffOutlinedIcon />}
        >
          {t("deleteTenant")}
        </ButtonMat>
      </div>
    );
  }

  // Tenant 2 form
  let tenantTwoForm = null;
  if (showTenantTwoForm) {
    tenantTwoForm = (
      <>
        <Divider variant="middle" />
        <div className={classes.GroupInput}>
          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="tenantNameTwo"
              value={tenancy.tenantDetails.tenantNameTwo}
              label={t("RJ1.stepOne.tenantsName")}
              placeholder={t("RJ1.stepOne.tenantsNamePL")}
              onChange={(e) => handleTenant(e)}
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
              {errors.tenantName}
            </FormHelperText>
          </div>

          <div className={classes.InputElementMaterial}>
            <TextField
              type="email"
              name="tenantEmailTwo"
              value={tenancy.tenantDetails.tenantEmailTwo}
              label={t("RJ1.stepOne.tenantsEmail")}
              placeholder={t("RJ1.stepOne.tenantsEmailPL")}
              onChange={(e) => handleTenant(e)}
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
              {errors.tenantEmail}
            </FormHelperText>
          </div>
        </div>
        <div className={classes.GroupInputAlone}>
          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="tenantPhoneTwo"
              value={tenancy.tenantDetails.tenantPhoneTwo}
              label={t("RJ1.stepOne.tenantsPhone")}
              placeholder={t("RJ1.stepOne.tenantsPhonePL")}
              onChange={(e) => handleTenant(e)}
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
              {errors.tenantPhone}
            </FormHelperText>
          </div>
        </div>
        <div className={classes.DeleteAddContainerButton}>
          {deleteButtonTwo}
          {buttonThree}
        </div>
      </>
    );
  }

  // Tenant 3 form
  let tenantThreeForm = null;
  if (showTenantThreeForm) {
    tenantThreeForm = (
      <>
        <Divider variant="middle" />
        <div className={classes.GroupInput}>
          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="tenantNameThree"
              value={tenancy.tenantDetails.tenantNameThree}
              label={t("RJ1.stepOne.tenantsName")}
              placeholder={t("RJ1.stepOne.tenantsNamePL")}
              onChange={(e) => handleTenant(e)}
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
              {errors.tenantName}
            </FormHelperText>
          </div>

          <div className={classes.InputElementMaterial}>
            <TextField
              type="email"
              name="tenantEmailThree"
              value={tenancy.tenantDetails.tenantEmailThree}
              label={t("RJ1.stepOne.tenantsEmail")}
              placeholder={t("RJ1.stepOne.tenantsEmailPL")}
              onChange={(e) => handleTenant(e)}
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
              {errors.tenantEmail}
            </FormHelperText>
          </div>
        </div>
        <div className={classes.GroupInputAlone}>
          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="tenantPhoneThree"
              value={tenancy.tenantDetails.tenantPhoneThree}
              label={t("RJ1.stepOne.tenantsPhone")}
              placeholder={t("RJ1.stepOne.tenantsPhonePL")}
              onChange={(e) => handleTenant(e)}
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
              {errors.tenantPhone}
            </FormHelperText>
          </div>
        </div>
        <div className={classes.DeleteAddContainerButton}>
          {deleteButtonThree}
          {buttonFour}
        </div>
      </>
    );
  }

  // Tenant 4 form
  let tenantFourForm = null;
  if (showTenantFourForm) {
    tenantFourForm = (
      <>
        <Divider variant="middle" />
        <div className={classes.GroupInput}>
          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="tenantNameFour"
              value={tenancy.tenantDetails.tenantNameFour}
              label={t("RJ1.stepOne.tenantsName")}
              placeholder={t("RJ1.stepOne.tenantsNamePL")}
              onChange={(e) => handleTenant(e)}
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
              {errors.tenantName}
            </FormHelperText>
          </div>

          <div className={classes.InputElementMaterial}>
            <TextField
              type="email"
              name="tenantEmailFour"
              value={tenancy.tenantDetails.tenantEmailFour}
              label={t("RJ1.stepOne.tenantsEmail")}
              placeholder={t("RJ1.stepOne.tenantsEmailPL")}
              onChange={(e) => handleTenant(e)}
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
              {errors.tenantEmail}
            </FormHelperText>
          </div>
        </div>
        <div className={classes.GroupInputAlone}>
          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="tenantPhoneFour"
              value={tenancy.tenantDetails.tenantPhoneFour}
              label={t("RJ1.stepOne.tenantsPhone")}
              placeholder={t("RJ1.stepOne.tenantsPhonePL")}
              onChange={(e) => handleTenant(e)}
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
              {errors.tenantPhone}
            </FormHelperText>
          </div>
        </div>
        <div className={classes.DeleteAddContainerButton}>
          {deleteButtonFour}
        </div>
      </>
    );
  }

  return (
    <form onSubmit={handleContinue}>
      <div className={classes.FormContainer}>
        <div className={classes.GroupInput}>
          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="tenantName"
              value={tenancy.tenantDetails.tenantName}
              label={t("RJ1.stepOne.tenantsName")}
              placeholder={t("RJ1.stepOne.tenantsNamePL")}
              onChange={(e) => handleTenant(e)}
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
              {errors.tenantName}
            </FormHelperText>
          </div>

          <div className={classes.InputElementMaterial}>
            <TextField
              type="email"
              name="tenantEmail"
              value={tenancy.tenantDetails.tenantEmail}
              label={t("RJ1.stepOne.tenantsEmail")}
              placeholder={t("RJ1.stepOne.tenantsEmailPL")}
              onChange={(e) => handleTenant(e)}
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
              {errors.tenantEmail}
            </FormHelperText>
          </div>
        </div>
        <div className={classes.GroupInputAlone}>
          <div className={classes.InputElementMaterial}>
            <TextField
              type="text"
              name="tenantPhone"
              value={tenancy.tenantDetails.tenantPhone}
              label={t("RJ1.stepOne.tenantsPhone")}
              placeholder={t("RJ1.stepOne.tenantsPhonePL")}
              onChange={(e) => handleTenant(e)}
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
              {errors.tenantPhone}
            </FormHelperText>
          </div>
        </div>
        {buttonTwo}
        {tenantTwoForm}
        {tenantThreeForm}
        {tenantFourForm}
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

TenantDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default withNamespaces()(TenantDetails);
