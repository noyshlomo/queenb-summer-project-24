import React from 'react';
import styles from './UploadRecipePage.module.css';
import UploadForm from '../../components/UploadForm/UploadForm';

const UploadRecipePage = () => {
    return (
       <div className={styles.uploadRecipe}>
         <h1 className={styles.headline}>Add A new Recipe</h1>
         <UploadForm />
       </div>
);
  };
  
  export default UploadRecipePage;