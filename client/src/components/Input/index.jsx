// Styles
import styles from "./input.module.scss";

const Input = ({ label, error, ...rest }) => {
  return (
    <div className={styles.Input}>
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

export default Input;
