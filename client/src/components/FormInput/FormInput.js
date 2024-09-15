import styles from './FormInput.module.css';

const FormInput = ({ label, type, value, onChange, emptyFields, fieldName }) => {
    return (
      <>
        <label>{label}</label>
        <input
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={emptyFields.includes(fieldName) ? styles.error : ''}
        />
      </>
    );
  };
  
  export default FormInput;