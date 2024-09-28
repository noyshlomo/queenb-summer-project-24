import React from 'react';
import { Link } from "react-router-dom"; 
import styles from './UploadRecipePage.module.css';
import useUserContext from "../../hooks/useUserContext";
import UploadForm from '../../components/UploadForm/UploadForm';



const UploadRecipePage = () => {
  const { user } = useUserContext(); 

  // Checking if the user is logged in
  if (!user) {
    return (
      <div className = {styles.notConnectedUpload}>
        <h2 className={styles.head2}>Please log in to upload a recipe.</h2>
        <Link to="/login" className={styles.linkToConnectU}>Go to Login</Link> 
      </div>
    );
  }

  return (
    <div className={styles.uploadRecipe}>
      <h1 className={styles.headline}>Add A New Recipe</h1>
        <UploadForm />
    </div>
);
  };
  
  export default UploadRecipePage;