import React from 'react';
import styles from './Home.module.css';
import ViewRecipes from '../ViewRecipes/ViewRecipes';
import DisplayRecipes from "../../components/DisplayRecipes/DisplayRecipes";


const Home = () => {
  return <div className={styles.home}><DisplayRecipes /> <ViewRecipes /></div>

};

export default Home;