// Styles
import styles from "./input.file.module.scss";

const InputFile = ({ label, error, ...rest }) => {
  return (
    <div className={styles.InputFile}>
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

export default InputFile;
