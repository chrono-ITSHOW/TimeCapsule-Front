import React, { useState, useTransition } from 'react';
import Glass from '../components/Glass';
import BackgroundImg from '../components/BackgroundImg';
import styles from '../styles/Capsule.module.css';

import { OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import { RepeatWrapping, TextureLoader } from 'three';
import axios from 'axios';

const createFileFromImageUrl = async (imageUrl) => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], "image.jpg", { type: "image/jpeg" });
        return file;
    } catch (error) {
        console.error("파일 생성 중 에러 발생", error);
        return null;
    }
};

const Capsule = () => {

    const sendImage  = async() => {
        try {
            const file = await createFileFromImageUrl(currentImage);
            const formData = new FormData();
            formData.append("capsuleImage", file);

            const res = await axios.post(`${process.env.REACT_APP_HOST}/letters/capsule`, formData, {
                'capsuleImage': formData
            });
            
            if (res.status === 200) {
                console.log("이미지 업로드 성공", res.status)
            }
            else {
                console.log(res.status)
            }

        } catch (error) {
            console.error("에러 발생", error)
        }    
    }

    const images = [ // 강아지, 고양이, 다람쥐, 벨루가, 오리, 코알라, 토끼, 판다
        'https://images.pexels.com/photos/2174209/pexels-photo-2174209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/86243/pexels-photo-86243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/8590539/pexels-photo-8590539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/64219/dolphin-marine-mammals-water-sea-64219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/162140/duckling-birds-yellow-fluffy-162140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/2610309/pexels-photo-2610309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ];

    const [currentImage, setCurrentImage] = useState(null);
    const [texture, setTexture] = useState(null);
    const [isPending, startTransition] = useTransition();

    const updateTexture = (image) => {
        const newTexture = new TextureLoader().load(image);
        newTexture.wrapS = RepeatWrapping;
        newTexture.wrapT = RepeatWrapping;
        newTexture.repeat.set(3, 3);
        setTexture(newTexture);
    };

    const changeImage = () => {
        startTransition(() => {
            const randomIndex = Math.floor(Math.random() * images.length);
            const newImage = images[randomIndex];
            setCurrentImage(newImage);
            updateTexture(newImage);
            // console.log(currentImage);
        });
    };

    return (
        <div>
            <div className={styles['capsule-container']}>
                <>
                    <p className={styles['title']}>추억이 담긴 사진으로 당신의 타임캡슐을 꾸며보세요!</p>
                    <p className={styles['sub-title']}>옆에 있는 QR을 찍어 내 갤러리에 있는 사진을 업로드 해보세요!</p>
                </>
                
                <div className={styles['capsule-box']}>
                    <div className={styles['capsule-circle']}>
                        <Canvas style={{ boxSizing: "border-box", width: "100%", height: "100%", backgroundColor: "#FFF", borderRadius: "100%", boxShadow: "inset 15px -20px 40px rgba(0, 0, 0, 0.2)" }} camera={{ fov: 30, near: 1, aspect: window.innerWidth / window.innerHeight, far: 1000, position: [0, 0, 10] }}>
                            <OrbitControls />
                            <mesh>
                                <sphereGeometry args={[5, 32, 32]} />
                                {texture && <meshBasicMaterial map={texture} />} 
                            </mesh>
                        </Canvas>
                    </div>

                    <div className={styles['capsule-img']}> 
                        <div className={styles['qr']}></div>
                        <div className={styles['img-button']} onClick={changeImage} >
                            <p>랜덤 이미지</p>
                        </div>
                    </div>
                </div>
            </div>

            <Glass sendImage={sendImage} />
            <BackgroundImg />
        </div>
    );
};

export default Capsule;