import React from 'react';
import {Link} from 'react-router-dom';
import styles from './ErrorPopup.module.css'; 


// Component for a error popup from the server
// this component is used for showing the error of the server
// props:
// errorMessage - the error message from the server
// onDismiss - the set function that sets the error to null and the isSubmitting to false to allow resubmission
const ErrorPopup = ({ errorMessage, onDismiss }) => (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2 className={styles.popupTitle}>Error</h2>
        <p>{errorMessage}</p>
        <Link to = "/"
          onClick={onDismiss} 
          className={styles.backToHomeButton}
        >
          Back to Home Page
        </Link>
      </div>
    </div>
  );

export default ErrorPopup;
