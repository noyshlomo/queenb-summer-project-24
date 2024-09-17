import React from 'react';
import styles from '../Popups/Popups.module.css';

// Function to render the cancel popup for recipe submission
// the props:
// getting the set function for the form inputs accordingly. (title, prepTime, description, ingredients, prepSteps, tags, imgLink)
// error, emptyFields - for setting the setError and setEmptyFields functions to null in the handleCancel function
// showCancel prop controls whether the popup is displayed or not
const CancelPopup = ({ title, prepTime, description, ingredients, prepSteps, tags, imgLink, error, emptyFields, showCancel }) => {
    
  //Function to handle cancel button click in the popup
  const handleCancel = (e) => {
        e.preventDefault();

        // Clearing form inputs and error state
        title('');
        prepTime(1); // do not want to allow non positive prep time
        description('');
        ingredients([]);
        prepSteps([]);
        tags([]);
        imgLink('');
        error(null);
        emptyFields([]);
        showCancel(false);

        // Redirecting the user to the home page after canceling the form submission
        window.location.href = 'http://localhost:3000/';
        
    };
    
    
    return (
      <div className={styles.overlay}>
      <div className={styles.popupBox}>
          <h2 style={{ marginBottom: '10px' }}>Are you sure you want to cancel? This will clear the form.</h2>
          <button onClick={handleCancel} className={`${styles.button} ${styles.successButton}`}>Yes</button>
          <button onClick={() => showCancel(false)} className={`${styles.button} ${styles.cancelButton}`}>No</button>
      </div>
    </div>
    );
  }
  
export default CancelPopup;