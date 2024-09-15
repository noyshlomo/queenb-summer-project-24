import React from 'react';
import styles from './Home.module.css';
import ViewRecipes from '../ViewRecipes/ViewRecipes';


const Home = () => {
  return (
    <div className={styles.home}>
      <ViewRecipes />
    </div>
  );
};

export default Home;
