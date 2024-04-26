import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import styles from '../styles/Glass.module.css'

function BackgroundImg() {

    return (
        <div className={styles['glassFullContainer']}>
            <div className={styles['glassFull']}></div>
        </div>
    );
}

export default BackgroundImg;