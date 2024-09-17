import styles from './FormInput.module.css';

// Component for an input field 
// the props: 
//label - the label for the input field in the form
// type - the type of input field (e.g., 'text', 'number', etc.)
// value - the state variable for the input field
// onChange - the set function to update the correct state variable
//emptyFields - an array of field names that should be marked as not filled by the user
// fieldName - the name of the current field in the form (as a string)
const FormInput = ({ label, type, value, onChange, emptyFields, fieldName }) => {
    // Checking if the current field is marked as part of the empty fields array, meaning that it was not filled by the user 
    const isError = emptyFields.includes(fieldName);

    return (
      <>
        <label>{label}</label>
        <input
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${styles.input} ${isError ? styles.errorBorder : ''}`}  // Adding error border if an error occurred
        />
        {isError && <span className={styles.errorText}>Required</span>} {/* if the field is empty, adding Required below it */}
      </>
    );
  };
  
  export default FormInput;