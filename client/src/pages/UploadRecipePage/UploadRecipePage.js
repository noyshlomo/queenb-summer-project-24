import React from 'react';
import styles from './UploadRecipe.module.css';
import UploadForm from '../../components/UploadForm/UploadForm';

const UploadRecipe = () => {
    return (
       <div className={styles.uploadRecipe}>
         <h1 className={styles.headline}>Add A new Recipe</h1>
         <UploadForm />
       </div>
);
  };
  
  export default UploadRecipe;