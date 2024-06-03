import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/BackgroundImg.module.css';

function BackgroundImg() {
    const location = useLocation();
    const currentPage = location.pathname;

    return (
        <div className={styles['backgroundContainer']}>
            <video 
                width='100vw' 
                height='100vh' 
                muted
                autoPlay
                loop
                className={styles.backgroundVideo}
            >
                {currentPage === '/' ? (
                    <source src="/video/timecapsule.mp4" type="video/mp4" />
                ) : (
                    <source src="/video/timecapsule_default.mp4" type="video/mp4" />
                )}
            </video>
        </div>
    );
}

export default BackgroundImg;
