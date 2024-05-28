import React, { useState, useEffect, useRef } from 'react';
import Glass from '../commponents/Glass';
import BackgroundImg from '../commponents/BackgroundImg';
import styles from '../styles/Capsule.module.css';

import { BsPen } from "react-icons/bs";
import { PiEraser } from "react-icons/pi";

const Capsule = () => {

    // canvas 그리기
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const paletteRef = useRef();
    
    const [ctx, setCtx] = useState();
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        contextRef.current = context;
        context.strokeStyle = 'black';

        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            context.lineWidth = 8;
        };

        window.addEventListener('resize', resizeCanvas);

        setCtx(context);
        resizeCanvas();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        }  

    }, []);

    const startDrawing = () => {
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        setIsDrawing(false);
    };

    const drawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;

        if(drawingMode) {
            if(ctx) {
                if(!isDrawing) {
                    ctx.beginPath();
                    ctx.moveTo(offsetX, offsetY);
                }
                else {
                    ctx.lineTo(offsetX, offsetY);
                    ctx.stroke();
                }
            }
        }
    };

    // .draw, .remove 클릭 시 색 변경 및 .draw를 클릭했을 때만 canvas가 그려지기
    const [isDrawActive, setIsDrawActive] = useState(false); 
    const [isRemoveActive, setIsRemoveActive] = useState(false); 
    const [drawingMode, setDrawingMode] = useState(false); 
    const [canvasStyle, setCanvasStyle] = useState({});
    const [showPalette, setShowPalette] = useState(false);
    const [currentColor, setCurrentColor] = useState('black');

    const handleDrawClick = () => {
        setIsDrawActive(true);
        setIsRemoveActive(false);
        setDrawingMode(true);
        setCanvasStyle({ cursor: 'url("/images/draw.svg") 0 32, auto' });
        setShowPalette(prev => !prev); 
        ctx.strokeStyle = currentColor;
    };

    const handleRemoveClick = () => {
        setIsDrawActive(false);
        setIsRemoveActive(true); 
        setCanvasStyle({ cursor: 'url("/images/remove.svg") 0 32, auto' });
        setShowPalette(false);
        ctx.strokeStyle = 'white';
    };

    const changeColor = (color) => {
        setCurrentColor(color);
        if (isDrawActive) {
            ctx.strokeStyle = color;
        }
    };

    const drawIconStyle = isDrawActive ? { fill: '#FF4836' } : {};
    const removeIconStyle = isRemoveActive ? { fill: '#FF4836' } : {};

    return (
        <div>
            <div className={styles['capsuleContainer']}>
                <>
                    <p className={styles['title']}>나만의 타입캡슐을 꾸며주세요!</p>
                    <p className={styles['sub-title']}>여기서 만든 타임캡슐은 나의 편지와 메인 화면에 보여져요 :&#41;</p>
                </>
                
                <div className={styles['capsuleBox']}>
                    <div className={styles['button']}>
                        <div className={styles['draw-container']}>
                            <div className={styles['draw-box']}>
                                <div className={styles['draw']} onClick={handleDrawClick}>
                                    <BsPen className={styles['draw-icon']} style={drawIconStyle} />
                                </div>
                            </div>
                            <div className={`${styles['paletteBox']} ${!showPalette && styles['hide-component']}`}>
                                <div className={styles['palette']} ref={paletteRef}>
                                    <div className={`${styles['color']} ${styles['red']} ${currentColor === '#FF4836' ? styles['selected-color'] : ''} `} onClick={() => changeColor('#FF4836')}></div>
                                    <div className={`${styles['color']} ${styles['yellow']}  ${currentColor === '#FFE55A' ? styles['selected-color'] : ''} `} onClick={() => changeColor('#FFE55A')}></div>
                                    <div className={`${styles['color']} ${styles['green']}  ${currentColor === '#00E132' ? styles['selected-color'] : ''} `} onClick={() => changeColor('#00E132')}></div>
                                    <div className={`${styles['color']} ${styles['blue']}  ${currentColor === '#4C94FF' ? styles['selected-color'] : ''} `} onClick={() => changeColor('#4C94FF')}></div>
                                    <div className={`${styles['color']} ${styles['purple']}  ${currentColor === '#B14EFF' ? styles['selected-color'] : ''} `} onClick={() => changeColor('#B14EFF')}></div>
                                    <div className={`${styles['color']} ${styles['black']}  ${currentColor === 'black' ? styles['selected-color'] : ''}`} onClick={() => changeColor('black')}></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles['remove']} onClick={handleRemoveClick}>
                            <PiEraser className={styles['remove-icon']} style={removeIconStyle} />
                        </div>
                    </div>

                    <div className={styles['canvasRectangle']} style={canvasStyle}>
                        <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={drawing} onMouseLeave={finishDrawing} />
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