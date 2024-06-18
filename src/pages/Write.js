// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Glass from '../components/Glass';
// import BackgroundImg from '../components/BackgroundImg';
// import Input from '../components/input';
// import styles from '../styles/Write.module.css';
// import popupStyles from '../styles/Popup.module.css';
// import { Icon } from '@iconify/react';
// import axios from 'axios';
// import { CapsuleContext } from './CapsuleProvider';
// import { OrbitControls } from "@react-three/drei";
// import { Canvas } from '@react-three/fiber';
// import { RepeatWrapping, TextureLoader } from 'three';

// const Write = ({ seletedMusicRef }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { capsulePath } = useContext(CapsuleContext);
//   const [id, setId] = useState('');
//   const [email, setEmail] = useState('');
//   const [inputText, setInputText] = useState('');
//   const [isChecked, setIsChecked] = useState(false);
//   const [isHeightExceeded, setIsHeightExceeded] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [capsuleImage, setCapsuleImage] = useState(capsulePath);
//   const [texture, setTexture] = useState(null);
//   const [currentImage, setCurrentImage] = useState(null);
  

//   const today = new Date();
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, '0');
//   const day = String(today.getDate()).padStart(2, '0');
//   const formattedDate = `${year}.${month}.${day}`;

//   const generateStyledText = () => {
//     const textWithLineBreaks = inputText.split('\n').map((line, index) => (
//       <React.Fragment key={index}>
//         {line}
//         <br />
//       </React.Fragment>
//     ));
//     return <div id="styledText">{textWithLineBreaks}</div>;
//   };

//   const handleInputChange = (e) => {
//     if (!isHeightExceeded) {
//       setInputText(e.target.value);
//     } else {
//       const previousText = inputText;
//       const newText = e.target.value;
//       const lengthDiff = previousText.length - newText.length;
//       if (lengthDiff > 0) {
//         setInputText(newText);
//       }
//     };
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };

//   const handlePopupOpen = () => {
//     setIsPopupOpen(true);
//   };

//   const handlePopupClose = () => {
//     setIsPopupOpen(false);
//   };

//   const { getCapsule } = useContext(CapsuleContext);
//   const { setCapsulePath } = useContext(CapsuleContext);
//   console.log(capsulePath)

//   const allLetter = async () => {
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_HOST}/letters`);
//       const letters = res.data;

//       console.log(letters);
//       const matchingLetter = letters.find(letter => letter.capsule === capsulePath);
//       if (matchingLetter) {
//         setId(matchingLetter.id);
//         setCapsuleImage(matchingLetter.capsule);
//         console.log(matchingLetter.id)
//       } else {
//       }
//     } catch (error) {
//       console.error("서버 연결 실패", error);
//     }
//   };
//   useEffect(() => {
//     allLetter();
//   }, [capsuleImage]);

//   const handleSend = async () => {
//     const data = {
//       recipient: null,
//       email: email,
//       content: inputText,
//     };
//     if (isChecked) {
//       data.recipient = "2025년의 나에게";
//     }
//     try {
//       const res = await axios.patch(`${process.env.REACT_APP_HOST}/letters/${id}`, data);
//       if (res.status === 200) {
//         console.log("성공~");
//         console.log(res.data);
//         navigate('/send')
//       } else {
//         console.log("실패!", res.status);
//       }
//     } catch (error) {
//       console.error("서버 연결 실패", error);
//     }
//     handlePopupClose();
//   };

//   const images = `${process.env.REACT_APP_HOST}/${capsuleImage}`;

//   useEffect(() => {
//     const styledTextElement = document.getElementById('styledText');
//     if (styledTextElement.scrollHeight <= 450) {
//       setIsHeightExceeded(false);
//     } else {
//       setIsHeightExceeded(true);
//     }
//   }, [inputText]);

//   allLetter();

//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <div className={styles['writeContainer']}>
//           <div className={styles['inputContainer']}>
//             <Input 
//               type="email" 
//               text='나의 편지를 보낼 이메일을 작성해주세요!' 
//               onChange={handleEmailChange}
//             />
//             <textarea
//               value={inputText}
//               type="text"
//               placeholder='편지 내용을 작성해주세요!'
//               onChange={handleInputChange}
//               className={`${styles['textareaStyle']} ${isHeightExceeded ? styles['textareaError'] : ''}`}
//             ></textarea>
//             <div className={styles["check"]}>
//               <input
//                 type="checkbox"
//                 className={styles["check1"]}
//                 onChange={handleCheckboxChange}
//               />
//               <label htmlFor="check1" style={{ fontSize: "20px" }}>2025년의 너에게</label>
//             </div>
//           </div>
//           <div className={styles['letterContainer']}>
//             <div style={{ color: "#FF918A", textAlign: "center" }}>
//               <div 
//                 style={{ 
//                   width: "54px", 
//                   height: "54px", 
//                   margin: "0 auto",
//                   marginBottom: "26px", 
//                   backgroundImage: `url(${process.env.REACT_APP_HOST}/${capsuleImage})`,
//                   backgroundSize: 'cover' 
//                 }}
//               >
//                 <Canvas style={{ boxSizing: "border-box", width: "100%", height: "100%", backgroundColor: "#FFF", borderRadius: "100%", boxShadow: "inset 15px -20px 40px rgba(0, 0, 0, 0.2)" }} camera={{ fov: 30, near: 1, aspect: window.innerWidth / window.innerHeight, far: 1000, position: [0, 0, 10] }}>
//                             <OrbitControls />
//                             <mesh>
//                                 <sphereGeometry args={[5, 32, 32]} />
//                                 {texture && <meshBasicMaterial map={texture} />} 
//                             </mesh>
//                 </Canvas>
//               </div>
//               {formattedDate}
//             </div>
//             <div style={{ height: "450px", overflow: "hidden" }}>
//               {generateStyledText()}
//             </div>
//             {isChecked && <p className={styles['checkText']}>2025년의 너에게</p>}
//           </div>
//           {isHeightExceeded && <div className={styles['ErrorStyle']}>글자 수가 초과했습니다</div>}
//         </div>
//       </div>
//       <Glass onPopupOpen={handlePopupOpen} />
//       <BackgroundImg />
//       {isPopupOpen && (
//         <div className={popupStyles['popupBackground']}>
//           <div className={popupStyles['popupStyle']}>
//             <Icon icon="solar:letter-linear" className={popupStyles['iconStyle']} />
//             <p style={{ fontSize: "24px", color: "#000", textShadow: "none" }}>편지를 전송할까요?</p>
//             <p style={{ fontSize: "16px", color: "#CDCDCD", textShadow: "none" }}>확인을 누르시면 이전으로 돌아가라 수 없어요</p>
//             <button className={popupStyles['btnStyle']} onClick={handleSend}>전송하기</button>
// </div>
// <p style={{ fontSize: "20px" }} onClick={handlePopupClose}>이어서 작성하기</p>
// </div>
// )}
// </div>
// );
// };
// export default Write;


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Glass from '../components/Glass';
import BackgroundImg from '../components/BackgroundImg';
import Input from '../components/input';
import styles from '../styles/Write.module.css';
import popupStyles from '../styles/Popup.module.css';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { CapsuleContext } from './CapsuleProvider';
import { OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import { RepeatWrapping, TextureLoader } from 'three';

const Write = ({ selectedMusicRef }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { capsulePath } = useContext(CapsuleContext);
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [inputText, setInputText] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isHeightExceeded, setIsHeightExceeded] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [capsuleImage, setCapsuleImage] = useState(capsulePath);
    const [texture, setTexture] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}.${month}.${day}`;

    const generateStyledText = () => {
        const textWithLineBreaks = inputText.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
        return <div id="styledText">{textWithLineBreaks}</div>;
    };

    const handleInputChange = (e) => {
        if (!isHeightExceeded) {
            setInputText(e.target.value);
        } else {
            const previousText = inputText;
            const newText = e.target.value;
            const lengthDiff = previousText.length - newText.length;
            if (lengthDiff > 0) {
                setInputText(newText);
            }
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const { getCapsule } = useContext(CapsuleContext);
    const { setCapsulePath } = useContext(CapsuleContext);

    const fetchLetter = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_HOST}/letters`);
            const letters = res.data;

            const matchingLetter = letters.find(letter => letter.capsule === capsulePath);
            if (matchingLetter) {
                setId(matchingLetter.id);
                setCapsuleImage(matchingLetter.capsule);
            }
        } catch (error) {
            console.error("서버 연결 실패", error);
        }
    };

    useEffect(() => {
        fetchLetter();
    }, [capsuleImage]);

    const handleSend = async () => {
        const data = {
            recipient: null,
            email: email,
            content: inputText,
        };
        if (isChecked) {
            data.recipient = "2025년의 나에게";
        }
        try {
            const res = await axios.patch(`${process.env.REACT_APP_HOST}/letters/${id}`, data);
            if (res.status === 200) {
                console.log("성공!");
                console.log(res.data);
                navigate('/send');
            } else {
                console.log("실패!", res.status);
            }
        } catch (error) {
            console.error("서버 연결 실패", error);
        }
        handlePopupClose();
    };

    useEffect(() => {
        const styledTextElement = document.getElementById('styledText');
        if (styledTextElement.scrollHeight <= 450) {
            setIsHeightExceeded(false);
        } else {
            setIsHeightExceeded(true);
        }
    }, [inputText]);

    useEffect(() => {
        const updateTexture = () => {
            if (capsuleImage) {
                const loader = new TextureLoader();
                loader.load(
                    `${process.env.REACT_APP_HOST}/${capsuleImage}`,
                    (texture) => {
                        texture.wrapS = RepeatWrapping;
                        texture.wrapT = RepeatWrapping;
                        texture.repeat.set(3, 3);
                        setTexture(texture);
                    },
                    undefined,
                    (error) => {
                        console.error('텍스처 로드 중 오류 발생', error);
                    }
                );
            }
        };
        updateTexture();
    }, [capsuleImage]);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={styles['writeContainer']}>
                    <div className={styles['inputContainer']}>
                        <Input
                            type="email"
                            text='나의 편지를 보낼 이메일을 작성해주세요!'
                            onChange={handleEmailChange}
                        />
                        <textarea
                            value={inputText}
                            type="text"
                            placeholder='편지 내용을 작성해주세요!'
                            onChange={handleInputChange}
                            className={`${styles['textareaStyle']} ${isHeightExceeded ? styles['textareaError'] : ''}`}
                        ></textarea>
                        <div className={styles["check"]}>
                            <input
                                type="checkbox"
                                className={styles["check1"]}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="check1" style={{ fontSize: "20px" }}>2025년의 너에게</label>
                        </div>
                    </div>
                    <div className={styles['letterContainer']}>
                        <div style={{ color: "#FF918A", textAlign: "center" }}>
                            <div
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    margin: "0 auto",
                                    marginBottom: "14px",
                                    backgroundSize: 'cover'
                                }}
                            >
                                <Canvas style={{ boxSizing: "border-box", width: "100%", height: "100%", backgroundColor: "#FFF", borderRadius: "100%", boxShadow: "inset 15px -20px 40px rgba(0, 0, 0, 0.2)" }} camera={{ fov: 30, near: 1, aspect: window.innerWidth / window.innerHeight, far: 1000, position: [0, 0, 10] }}>
                                    <OrbitControls />
                                    <mesh>
                                        <sphereGeometry args={[5, 32, 32]} />
                                        {texture && <meshBasicMaterial map={texture} />}
                                    </mesh>
                                </Canvas>
                            </div>
                            {formattedDate}
                        </div>
                        <div style={{ height: "450px", overflow: "hidden" }}>
                            {generateStyledText()}
                        </div>
                        {isChecked && <p className={styles['checkText']}>2025년의 너에게</p>}
                    </div>
                    {isHeightExceeded && <div className={styles['ErrorStyle']}>글자 수가 초과했습니다</div>}
                </div>
            </div>
            <Glass onPopupOpen={handlePopupOpen} />
            <BackgroundImg />
            {isPopupOpen && (
                <div className={popupStyles['popupBackground']}>
                    <div className={popupStyles['popupStyle']}>
                        <Icon icon="solar:letter-linear" className={popupStyles['iconStyle']} />
                        <p style={{ fontSize: "24px", color: "#000", textShadow: "none" }}>편지를 전송할까요?</p>
                        <p style={{ fontSize: "16px", color: "#CDCDCD", textShadow: "none" }}>확인을 누르시면 이전으로 돌아갈 수 없어요</p>
                        <button className={popupStyles['btnStyle']} onClick={handleSend}>전송하기</button>
                    </div>
                    <p style={{ fontSize: "20px" }} onClick={handlePopupClose}>이어서 작성하기</p>
                </div>
            )}
        </div>
    );
};

export default Write;
