// import React, { useEffect } from 'react';
// import { Icon } from '@iconify/react';
// import styles from '../styles/BackgroundImg.module.css'

// function BackgroundImg() {

//     return (
//         <div className={styles['backgroundContainer']}>
//             <img src='/images/ball-light.png' alt="공1" className={styles['ball1']}/>
//             <img src='/images/ball-light.png' alt="공2" className={styles['ball2']}/>
//             <img src='/images/ball-light.png' alt="공3" className={styles['ball3']}/>
//             <img src='/images/ball-light.png' alt="공4" className={styles['ball4']}/>
//             <img src='/images/ring.png' alt="링1" className={styles['ring1']}/>
//             <img src='/images/ring.png' alt="링2" className={styles['ring2']}/>
//         </div>
//     );
// }

// export default BackgroundImg;

import React, { useEffect, useState } from 'react';
import styles from '../styles/BackgroundImg.module.css'

function BackgroundImg() {
    const [initialOffsets, setInitialOffsets] = useState([]);
    const [startTimes, setStartTimes] = useState([]);
    const [animationId, setAnimationId] = useState(null); // animationId 상태 추가

    useEffect(() => {
        const listItems = document.querySelectorAll('.rolling-list ul li');

        const offsets = Array.from(listItems, () => Math.floor(Math.random() * 41) - 20);
        setInitialOffsets(offsets);

        const times = Array.from(listItems, () => Math.random() * 4000);
        setStartTimes(times);

        // 컴포넌트 언마운트 시 clearInterval을 호출하여 메모리 누수 방지
        return () => cancelAnimationFrame(animationId);
    }, []); // 이펙트는 한 번만 실행되어야 함

    useEffect(() => {
        const updateAnimation = () => {
            const currentTime = Date.now();
            const newListItems = document.querySelectorAll('.backgroundContainer img');

            newListItems.forEach((item, index) => {
                const elapsed = ((currentTime - startTimes[index]) % 4000) / 4000;
                const offset = initialOffsets[index] + Math.sin(elapsed * Math.PI * 2) * 10;
                item.style.transform = `translateY(${offset}px)`;
            });

            const newAnimationId = requestAnimationFrame(updateAnimation); // 새로운 animationId 생성
            setAnimationId(newAnimationId); // animationId 상태 업데이트
        };

        const newAnimationId = requestAnimationFrame(updateAnimation); // 초기 animationId 생성
        setAnimationId(newAnimationId); // animationId 상태 업데이트

        // useEffect 내부에서 반환된 함수가 cleanup 함수가 됨
        return () => cancelAnimationFrame(animationId); // cleanup 함수에서 이전 animationId 해제
    }, [initialOffsets, startTimes]); // 초기 위치와 시작 시간이 변경될 때마다 실행

    return (
        <div className={styles['backgroundContainer']}>
            <img src='/images/ball-light.png' alt="공1" className={styles['ball1']}/>
            <img src='/images/ball-light.png' alt="공2" className={styles['ball2']}/>
            <img src='/images/ball-light.png' alt="공3" className={styles['ball3']}/>
            <img src='/images/ball-light.png' alt="공4" className={styles['ball4']}/>
            <img src='/images/ring.png' alt="링1" className={styles['ring1']}/>
            <img src='/images/ring.png' alt="링2" className={styles['ring2']}/>
        </div>
    );
}

export default BackgroundImg;
