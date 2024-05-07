import React from 'react';
import styles from '../styles/BackgroundImg.module.css';

function BackgroundImg() {
    return (
        <div className={styles['backgroundContainer']}>
            <img src='/images/ball-light.png' alt="공1" className={styles['ball1']}/>
            <img src='/images/ball-light.png' alt="공2" className={styles['ball2']}/>
            <img src='/images/ball-light.png' alt="공3" className={styles['ball3']}/>
            <img src='/images/ball-light.png' alt="공4" className={styles['ball4']}/>
            <img src='/images/ring.png' alt="링1" className={styles['ring1']}/>
            <img src='/images/ring.png' alt="링2" className={styles['ring2']}/>
        </div>
    );
}

export default BackgroundImg;
