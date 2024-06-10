import React from 'react';
import styles from '../styles/Qr.module.css'
import { Icon } from '@iconify/react';

function Qr() {

    return (
        <div className={styles['container']}>
            <img src='/images/timecapsule.png' />

            <div className={styles['box']}>
                <div>            
                    <img src='/images/gallery.png' />
                    <p>이미지 업로드</p>
                </div>
            </div>

            <div className={styles['button']}>
                이미지 적용
            </div>
        </div>
    );
}

export default Qr;
