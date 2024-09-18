import React from 'react';
import styles from '../Popups/Popups.module.css';

// SuccessPopup component displays a success message when a new recipe is uploaded
// showSuccess prop controls whether the popup is displayed or not
const SuccessPopup = ({showSuccess}) => (
    <div className={styles.overlay}>
      <div className={styles.popupBox}>
        <h2 style={{ marginBottom: '10px' }}>Recipe Uploaded Successfully!</h2>
        <p>Your new recipe has been added.</p>
        <a 
          href={`/`} 
          className={`${styles.button} ${styles.successButton}`}
        >
          View All Recipes In Home Page
        </a>
        <button 
          onClick={() => showSuccess(false)} // Hide the success popup when the button is clicked
          className={`${styles.button} ${styles.closeButton}`}
        >
          Close
        </button>
      </div>
    </div>
  );

export default SuccessPopup;
