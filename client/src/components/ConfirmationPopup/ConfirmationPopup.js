import React from 'react';
import styles from '../Popups/Popups.module.css';


// Component for a confirmation popup to confirm the user's submission
// this component is used for making sure the user wants to submit the recipe before saving it
// props:
// confirm - boolean indicating whether the popup should be shown
// onConfirm - function to be called when the user confirms the submission (in the parent component)
// onCancel - the set function that sets the confirm state to true or false, in this case will be called for false
const ConfirmationPopup = ({ confirm, onConfirm, onCancel }) => {
  // If the boolean of confirm is false, return null to hide the popup
  if (!confirm) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popupBox}>
        <h2 style={{ marginBottom: '10px' }}>Are you sure you want to submit the recipe?</h2>
        <div className = {styles.buttonsContainer}>
          <button onClick={onConfirm} className={`${styles.button} ${styles.successButton}`}>Yes</button>
          <button onClick={onCancel} className={`${styles.button} ${styles.cancelButton}`}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;