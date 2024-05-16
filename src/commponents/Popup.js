import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Popup.module.css'
import { Icon } from '@iconify/react';

const Popup = ({ isPopup, onClose }) => {
    const navigate = useNavigate();

    const handleSend = () => {
        navigate('/send');
    };

    return (
        <div className={styles['popupBackground']}>
            <div className={styles['popupStyle']}>
                <Icon icon="solar:letter-linear" className={styles['iconStyle']}/>
                <p style={{fontSize:"24px", color:"#000", textShadow:"none"}}>편지를 전송할까요?</p>
                <p style={{fontSize:"16px", color:"#CDCDCD", textShadow:"none"}}>확인을 누르시면 이전으로 돌아갈 수 없어요</p>
                <button className={styles['btnStyle']} onClick={handleSend}>전송하기</button>
            </div>
            <p style={{fontSize:"20px"}} onClick={onClose}>이어서 작성하기</p>
        </div>
    )
}

export default Popup;
