import React from 'react';
import styles from './Home.module.css';
import DisplayRecipes from "../../components/DisplayRecipes/DisplayRecipes";


const Home = () => {
  return <div className={styles.home}><DisplayRecipes /> </div>

};

export default Home;