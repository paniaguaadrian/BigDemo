// Styles
import styles from "./button.module.scss";

const Button = ({ type, children, onClick }) => {
  return (
    <button type={type} onClick={onClick} className={styles.Button}>
      {children}
    </button>
  );
};

export default Button;
