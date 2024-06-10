import Glass from '../commponents/Glass';
import BackgroundImg from '../commponents/BackgroundImg';
import Nav from '../commponents/Nav';
import styles from '../styles/Capsule.module.css';

import { OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';

const Capsule = () => {
    const imageUrls = [
        'https://cdn.imweb.me/thumbnail/20210304/035d01c442580.png',
        'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
        'https://m.ministorypet.com/web/product/big/202208/ee2eeb094842d1f42bcb689ede6d6638.jpg',
        'https://cdn.womaneconomy.co.kr/news/photo/202310/219358_427481_4850.jpg',
        'https://together-mud.kakaocdn.net/dn/ddUiy9/btsdGABygpb/MsARp4M5vZdcumFmyHKoN1/c360.jpg'
    ];

    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const randomImageUrl = imageUrls[randomIndex];

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
                        </Canvas>
                    </div>

                    <div className={styles['capsule-img']}>
                        <div className={styles['qr']}>
                        </div>
                        <div className={styles['img-button']}>
                            <p>랜덤 이미지</p>
                        </div>
                    </div>
                </div>
            </div>

            <Glass />
            <Nav />
            <BackgroundImg />
        </div>
    );
};

export default Capsule;