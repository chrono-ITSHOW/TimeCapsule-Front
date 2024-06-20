import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import BackgroundImg from '../components/BackgroundImg';
import styles from '../styles/Start.module.css';
import axios from 'axios';

function Start() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('user_id');
    }, []);

    const handleClick = async (path) => {
        if (path === '/capsule') {
            try {
                const res = await axios.post(`${process.env.REACT_APP_HOST}/letters/capsule`);
                const id = res.data.id;
                localStorage.setItem('user_id', id);
                navigate(path, { state: { id } });
                console.log('완료', res);
            } catch (error) {
                console.error("에러 발생", error);
            }
        } else {
            navigate(path);
        }
    };

    return (
        <div>
            <div className={styles['container']}>
                <div className={styles['textContainer']}>
                </div>
                <button className={styles['btnStyle']} onClick={() => handleClick('/capsule')}>작성하기<Icon icon="formkit:right"></Icon></button>
                <button className={styles['btnStyle']} onClick={() => handleClick('/gallery')}>갤러리 바로가기<Icon icon="formkit:right"></Icon></button>
            </div>
            <BackgroundImg />
        </div>
    );
}

export default Start;