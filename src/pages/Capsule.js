import Glass from '../commponents/Glass';
import BackgroundImg from '../commponents/BackgroundImg';
import styles from '../styles/Capsule.module.css';

import { OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';

const Capsule = () => {
    return (
        <div>
            <div className={styles['capsule-container']}>
                <>
                    <p className={styles['title']}>나만의 타임캡슐을 꾸며주세요!</p>
                    <p className={styles['sub-title']}>여기서 만든 타임캡슐은 나의 편지와 메인 화면에 보여져요 :&#41;</p>
                </>
                
                <div className={styles['capsule-box']}>
                    <div className={styles['canvas-circle']}>
                        <Canvas style={{ boxSizing: "border-box", margin: 10, width: "100%", height: "100%", backgroundColor: "#FFF", borderRadius: "100%", boxShadow: "inset 15px -20px 40px rgba(0, 0, 0, 0.2)" }} camera={{ fov: 30, near: 1, aspect: window.innerWidth / window.innerHeight, far: 1000, position: [0, 0, 10] }}>
                            <OrbitControls />
                        </Canvas>
                    </div>
                </div>
            </div>

            <Glass />
            <BackgroundImg />
        </div>
    );
};

export default Capsule;