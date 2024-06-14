import Glass from '../commponents/Glass';
import BackgroundImg from '../commponents/BackgroundImg';
import Nav from '../commponents/Nav';
import styles from '../styles/Capsule.module.css';

import { OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';

const Capsule = () => {

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