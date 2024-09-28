import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Popups/Popups.module.css';

const CancelEditPopup = ({ showCancel }) => {
  const navigate = useNavigate();
 
  const handleCancel = (e) => {
    e.preventDefault();
    showCancel(false); 
    navigate('/'); 
        
    };
    
    return (
      <div className={styles.overlay}>
      <div className={styles.popupBox}>
          <h2 style={{ marginBottom: '10px' }}>Are you sure you want to cancel? </h2>
          <div className = {styles.buttonsContainer}>
            <button onClick={handleCancel} className={`${styles.button} ${styles.successButton}`}>Yes</button>
            <button onClick={() => showCancel(false)} className={`${styles.button} ${styles.cancelButton}`}>No</button>
          </div>
      </div>
    </div>
    );
  }
  
export default CancelEditPopup;