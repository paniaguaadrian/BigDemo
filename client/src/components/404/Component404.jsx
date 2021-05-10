// React Components
import React from "react";

// Material-UI Icons
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";

// Styles
import styles from "./component404.module.scss";

const C404 = (props) => {
  return (
    <div className={styles.C404PageContainer}>
      <div className={styles.C404PageText}>
        {props.children}
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
        <p>
          <span>
            <EmailIcon />
          </span>
          <a href="mailto:info@rimbo.rent">{props.paragraphEmail}</a>
        </p>
        <p>
          <span>
            <CallIcon />
          </span>
          {props.paragraphPhone}
        </p>
        <img src={props.imageSRC} alt={props.imageAlt} />
      </div>
    </div>
  );
};

export default C404;
