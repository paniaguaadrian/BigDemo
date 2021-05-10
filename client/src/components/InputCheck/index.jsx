// Styles
import styles from "./input.check.module.scss";

const InputCheck = ({ label, error, ...rest }) => {
  return (
    <div className={styles.InputCheck}>
      <label>{label}</label>
      <input {...rest} />
      {error && (
        <div className={styles.InputErrorContainer}>
          <span className={styles.InputError}>{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputCheck;
