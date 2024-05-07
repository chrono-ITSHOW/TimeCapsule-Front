import React, { useState, useEffect } from 'react';
import Glass from '../commponents/Glass';
import BackgroundImg from '../commponents/BackgroundImg';
import styles from '../styles/Capsule.module.css'

import { BsPen } from "react-icons/bs";
import { PiEraser } from "react-icons/pi";

const Capsule = () => {

    return (
        <div>
            <div className={styles['capsuleContainer']}>
                <>
                    <p className={styles['title']}>나만의 타입캡슐을 꾸며주세요!</p>
                    <p className={styles['sub-title']}>여기서 만든 타임캡슐은 나의 편지와 메인 화면에 보여져요 :&#41;</p>
                </>
                
                <div className={styles['capsuleBox']}>
                    <div className={styles['button']}>

                        <div className={styles['draw']}>
                            <BsPen className={styles['draw-icon']}/>
                        </div>
                        <div className={styles['remove']}>
                            <PiEraser className={styles['remove-icon']} />
                        </div>
                    </div>

                    <div className={styles['canvasRectangle']}>
                        <canvas></canvas>
                    </div>

                    <div className={styles['canvasCircle']}>

                    </div>
                </div>
            </div>

            <Glass />
            <BackgroundImg />
        </div>
    );
};

export default Capsule;