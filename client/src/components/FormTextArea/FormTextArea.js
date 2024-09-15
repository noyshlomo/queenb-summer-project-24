import styles from './FormTextArea.module.css';

const FormTextArea = ({ label, value, onChange, emptyFields, fieldName }) => {
    return (
      <>
        <label>{label}</label>
        <textarea
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={emptyFields.includes(fieldName) ? styles.error : ''}
        />
      </>
    );
  };
  
  export default FormTextArea;
  