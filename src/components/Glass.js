import React from 'react';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/Glass.module.css';

const Glass = () => {
  const location = useLocation();
  
  return (
    <div className={styles['container']}>
      <img src='/images/timecapsule.png' className={styles['title']} alt="타임캡슐" />
      <div className={styles['glassContainer']}>
        <div className={styles['glass']}></div>
      </div>
    </div>
  );
}

export default Glass;
