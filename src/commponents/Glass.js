import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/Glass.module.css'

function Glass() {
    const location = useLocation();
    const currentPage = location.pathname;
    return (
        <div className={styles['glassContainer']}>
            <Icon icon="icon-park-solid:left-c" className={styles['btnStyles']}/>
            <div className={styles['glass']}></div>
            {currentPage === '/Write' ? <img src='/images/send.png' className={styles['btnStyles']}/> : <Icon icon="icon-park-solid:right-c" className={styles['btnStyles']}/>}
        </div>
    );
}

export default Glass;