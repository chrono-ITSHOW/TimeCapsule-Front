import React from 'react';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/Nav.module.css';

const Nav = ({ onPopupOpen }) => {
  const location = useLocation();
  const currentPage = location.pathname;

  const handleImageClick = () => {
    // 이미지 클릭 시 팝업 열기
    onPopupOpen();
  };

  return (
    <div className={styles['nav-contianer']}>
        <Icon icon="icon-park-solid:left-c" className={styles['btnStyles']} />
        {currentPage === '/write' ? (
          <img
            src='/images/send.png'
            className={styles['btnStyles']}
            alt='보내기'
            onClick={handleImageClick} // 이미지 클릭 이벤트 핸들러 추가
          />
        ) : (
          <Icon icon="icon-park-solid:right-c" className={styles['btnStyles']} />
        )}
      </div>
  );
}

export default Nav;
