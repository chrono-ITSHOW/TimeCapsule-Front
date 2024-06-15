import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import BackgroundImg from '../components/BackgroundImg';
import styles from '../styles/Loading.module.css'
import MainStyle from '../styles/Style.module.css'
import GlassFull from '../components/GlassFull';

function Send() {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
      };
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
}, []);

    return (
        <div className={MainStyle['center']}>
            <div className={styles['loadingContainer']}>
                {isLoading ? (
                    <>
                    <div className={styles["loading"]}>
                        <span className={styles["loading__dot"]}></span>
                        <span className={styles["loading__dot"]}></span>
                        <span className={styles["loading__dot"]}></span>
                    </div>
                    <p style={{fontSize:"32px", marginBottom:"2vw"}}>편지가 배달되고 있어요</p>
                    </>
                ) : (
                    <>
                        <Icon icon="solar:letter-linear" style={{fontSize:"47px"}}/>
                        <p style={{fontSize:"32px"}}>1월 1일의 당신에게 편지가 무사히 도착했어요 :&#41;</p>
                        <div className={styles['galleryBtn']} onClick={() => handleClick('/capsule')}>갤러리 바로가기<Icon icon="ep:right"></Icon></div>
                    </>
                )}
            </div>
            <GlassFull />
            <BackgroundImg />
        </div>
    );
}

export default Send;
