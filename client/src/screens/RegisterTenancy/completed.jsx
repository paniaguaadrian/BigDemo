// React Components
import React from "react";
import PropTypes from "prop-types";

// Custom Components
import Success from "../../components/Success/Success";

// Images
import SuccessImage from "../../images/success-image.svg";

// Multi language
import { withNamespaces } from "react-i18next";

const Completed = ({ t }) => {
  return (
    <>
      <Success
        title={t("RJ1.success.title")}
        subtitle={t("RJ1.success.subtitle")}
        imageSRC={SuccessImage}
        imageAlt="Success image"
      />
    </>
  );
};

Completed.propTypes = {
  tenancy: PropTypes.object,
};

export default withNamespaces()(Completed);
