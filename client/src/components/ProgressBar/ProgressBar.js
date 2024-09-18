import React from 'react';
import styles from './ProgressBar.module.css';

// Function to render a progress bar with the given progress percentage
// the props: progress - the percentage of progress (0-100)
const ProgressBar = ({ progress }) => {
    return (
      <div className={styles.progressContainer}>
        <progress className={styles.progressBar} value={progress} max="100" /> 
        <span className={styles.progressText}>{progress}%</span> {/* Displaying the progress percentage */}
      </div>
    );
  };
  
export default ProgressBar;