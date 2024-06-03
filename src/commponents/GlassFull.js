import React, { useEffect } from 'react';
import styles from '../styles/Glass.module.css'

function BackgroundImg() {

    return (
        <div className={styles['glassContainer']} style={{flexDirection:"column", bottom:"110px"}}>
            <img src='/images/timecapsule.png' style={{width:"50vw"}}/>
            <div className={styles['glassFull']}></div>
        </div>
    );
}

export default BackgroundImg;