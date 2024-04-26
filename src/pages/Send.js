import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import BackgroundImg from '../commponents/BackgroundImg';
import styles from '../styles/Loading.module.css'
import MainStyle from '../styles/Style.module.css'
import GlassFull from '../commponents/GlassFull'

function Send() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/Send');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={MainStyle['center']}>
            <div className={styles['loadingContainer']}>
                <Icon icon="solar:letter-linear" style={{fontSize:"67px"}}/>

                <p style={{fontSize:"32px"}}>1월 1일의 당신에게 편지가 무사히 전송되었어요 :)</p>
            </div>
            <GlassFull />
            <BackgroundImg />
        </div>
    );
}

export default Send;
