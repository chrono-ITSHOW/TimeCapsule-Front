import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/Glass.module.css';
import Popup from './Popup';

const Glass = () => {
    const location = useLocation();
    const currentPage = location.pathname;

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    };
    return (
        <div className={styles['glassContainer']}>
            <Icon icon="icon-park-solid:left-c" className={styles['btnStyles']} />
            <div className={styles['glass']}></div>
            {currentPage === '/write' ? (
                <img
                    src='/images/send.png'
                    className={styles['btnStyles']}
                    alt='보내기'
                    onClick={handlePopupOpen}
                />
            ) : (
                <Icon icon="icon-park-solid:right-c" className={styles['btnStyles']} />
            )}
            {isPopupOpen && <Popup />}
        </div>
    );
}

export default Glass;
