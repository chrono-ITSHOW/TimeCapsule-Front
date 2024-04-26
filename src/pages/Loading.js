import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import BackgroundImg from '../commponents/BackgroundImg';
import styles from '../styles/Loading.module.css'
import MainStyle from '../styles/Style.module.css'
import GlassFull from '../commponents/GlassFull'

function Loading() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/Send');
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={MainStyle['center']}>
            <div className={styles['loadingContainer']}>
                <div className={styles["loading"]}>
                    <span className={styles["loading__dot"]}></span>
                    <span className={styles["loading__dot"]}></span>
                    <span className={styles["loading__dot"]}></span>
                </div>

                <p style={{fontSize:"32px"}}>편지가 배달되고 있어요</p>
            </div>
            <GlassFull />
            <BackgroundImg />
        </div>
    );
}

export default Loading;
