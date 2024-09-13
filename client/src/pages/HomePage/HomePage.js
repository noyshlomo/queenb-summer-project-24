import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>rec</h1>
      <input type="button" onclick="location.href='https://google.com';" value="Go to Google" />
    </div>
  );
};

export default Home;
