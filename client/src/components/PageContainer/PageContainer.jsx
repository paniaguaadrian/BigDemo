import React from "react";

// Styles
import styles from "./PageContainer.module.scss";

const PageContainer = (props) => {
  return <div className={styles.PageContainer}>{props.children}</div>;
};

export default PageContainer;
