// React Components
import React from "react";

// Styles
import styles from "./success.module.scss";

const Success = (props) => {
  const imageStyle = {
    width: "25rem",
    margin: "0 auto",
  };
  return (
    <div className={styles.SuccessPageContainer}>
      <div className={styles.SuccessPageText}>
        {props.children}
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
        <p>{props.paragraph}</p>
        <img src={props.imageSRC} style={imageStyle} alt={props.imageAlt} />
      </div>
    </div>
  );
};

export default Success;
