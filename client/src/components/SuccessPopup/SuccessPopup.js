import React from 'react';
import styles from '../Popups/Popups.module.css';
import {Link} from 'react-router-dom';

// SuccessPopup component displays a success message when a new recipe is uploaded
// showSuccess prop controls whether the popup is displayed or not
const SuccessPopup = ({showSuccess}) => (
    <div className={styles.overlay}>
      <div className={styles.popupBox}>
        <h2 style={{ marginBottom: '10px' }}>Recipe Uploaded Successfully!</h2>
        <p>Your new recipe has been added.</p>
        <div className= {styles.buttonsContainer}>
        <Link
          to="/"
          className={`${styles.button} ${styles.successButton}`}
        >
          View All Recipes In Home Page
        </Link>
        <button 
          onClick={() => showSuccess(false)} // Hide the success popup when the button is clicked
          className={`${styles.button} ${styles.closeButton}`}
        >
          Close
        </button>
        </div>
      </div>
    </div>
  );

export default SuccessPopup;
