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
            context.lineWidth = 5;
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

    const handleDrawClick = (context) => {
        setIsDrawActive(true);
        setIsRemoveActive(false);
        setDrawingMode(true);
        ctx.strokeStyle = 'black';
        setCanvasStyle({ cursor: 'url("/images/draw.svg"), auto' });
        setShowPalette(prev => !prev); 
    };

    const handleRemoveClick = (context) => {
        setIsDrawActive(false);
        setIsRemoveActive(true); 
        ctx.strokeStyle = 'white';
        setCanvasStyle({ cursor: 'url("/images/remove.svg"), auto' });
        setShowPalette(false);
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
                                    <div className={`${styles['color']} ${styles['red']}`}></div>
                                    <div className={`${styles['color']} ${styles['yellow']}`}></div>
                                    <div className={`${styles['color']} ${styles['green']}`}></div>
                                    <div className={`${styles['color']} ${styles['blue']}`}></div>
                                    <div className={`${styles['color']} ${styles['purple']}`}></div>
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