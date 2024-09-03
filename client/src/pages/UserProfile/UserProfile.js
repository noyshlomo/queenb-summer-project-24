import React from 'react';
import styles from './UserProfile.module.css';
import Dashboard from '../../components/Dashboard/RandomDuck';

const UserProfile = () => {
  return (
    <div className={styles.UserProfile}>
      <h1 className={styles.UserProfile}>My Recipes</h1>
      <Dashboard />
    </div>
  );
};

export default UserProfile;
