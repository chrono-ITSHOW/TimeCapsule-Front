import React, { useEffect } from 'react';
import styles from '../styles/Glass.module.css'

function BackgroundImg() {

    return (
        <div className={styles['glassContainer']}>
            <div className={styles['glassFull']}></div>
        </div>
    );
}

export default BackgroundImg;