import React from 'react';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/Glass.module.css';
import NavStyles from '../styles/Nav.module.css';

const Glass = ({ onPopupOpen, sendImage }) => {
  const location = useLocation();
  const currentPage = location.pathname;

  const handleImageClick = () => {
    onPopupOpen();
  };


  const handleGoBack = () => {
    window.history.back();
};


  return (
    <div className={styles['container']}>
      <img src='/images/timecapsule.png' className={styles['title']} alt="타임캡슐" />
      <div className={styles['glassContainer']}>
        <Icon icon="icon-park-solid:left-c" className={NavStyles['btnStyles']} onClick={handleGoBack} />
        <div className={styles['glass']}></div>
        {currentPage === '/write' ? (
          <img
            src='/images/send.png'
            className={NavStyles['btnStyles']}
            style={{marginTop:"0.1vw"}}
            alt='보내기'
            onClick={handleImageClick}
          />
        ) : (
        <Icon icon="icon-park-solid:right-c" className={NavStyles['btnStyles']} onClick={sendImage} />
        )}
      </div>
    </div>
  );
}

export default Glass;