import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import BackgroundImg from '../components/BackgroundImg';
import styles from '../styles/Start.module.css'
import GlassFull from '../components/GlassFull'

function Start() {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
      };

    return (
        <div>
            <div className={styles['container']}>
                <div className={styles['textContainer']}>
                </div>
                <button className={styles['btnStyle']} onClick={() => handleClick('/write')}>작성하기<Icon icon="formkit:right"></Icon></button>
                <button className={styles['btnStyle']} onClick={() => handleClick('/gallery')}>갤러리 바로가기<Icon icon="formkit:right"></Icon></button>
            </div>
            
            <BackgroundImg />
        </div>
    );
}

export default Start;
