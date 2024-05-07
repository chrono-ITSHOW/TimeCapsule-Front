import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import styles from '../styles/Glass.module.css'

function Glass() {

    return (
        <div className={styles['glassContainer']}>
            <Icon icon="icon-park-solid:left-c" className={styles['btnStyles']}/>
            <div className={styles['glass']}></div>
            <img src='/images/send.png' className={styles['btnStyles']}/>
        </div>
    );
}

export default Glass;