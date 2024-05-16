import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import BackgroundImg from '../commponents/BackgroundImg';
import styles from '../styles/Start.module.css'
import GlassFull from '../commponents/GlassFull'

function Start() {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
      };

    return (
        <div>
            <div className={styles['container']}>
                <div className={styles['textContainer']}>
                    <p className={styles['subText']}>To you in the future</p>
                    <h1 className={styles['mainText']}>time capsule</h1>
                </div>
                <button className={styles['btnStyle']} onClick={() => handleClick('/write')}>작성하기<Icon icon="formkit:right"></Icon></button>
                <div className={styles['galleryBtn']} onClick={() => handleClick('/gallery')}>갤러리 바로가기<Icon icon="ep:right"></Icon></div>
            </div>
            
            <GlassFull />
            <BackgroundImg />
        </div>
    );
}

export default Start;
