import React, { useState, useEffect, useRef } from 'react';
import Glass from '../commponents/Glass';
import BackgroundImg from '../commponents/BackgroundImg';
import styles from '../styles/Capsule.module.css';

import { BsPen } from "react-icons/bs";
import { PiEraser } from "react-icons/pi";

const Capsule = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const paletteRef = useRef();
    const eraserRef = useRef();

    const [ctx, setCtx] = useState(null);
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
        };
    }, []);

    const startDrawing = () => {
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        setIsDrawing(false);
        if (ctx) {
            ctx.closePath();
        }
    };

    const drawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;

        if (drawingMode) {
            if (ctx) {
                if (!isDrawing) {
                    ctx.beginPath();
                    ctx.moveTo(offsetX, offsetY);
                } else {
                    ctx.lineTo(offsetX, offsetY);
                    ctx.stroke();
                }
            }
        }
    };

    const [isDrawActive, setIsDrawActive] = useState(false);
    const [isRemoveActive, setIsRemoveActive] = useState(false);
    const [drawingMode, setDrawingMode] = useState(false);
    const [canvasStyle, setCanvasStyle] = useState({});
    const [showPalette, setShowPalette] = useState(false);
    const [showEraser, setShowEraser] = useState(false);
    const [currentColor, setCurrentColor] = useState('black');

    const handleDrawClick = () => {
        setIsRemoveActive(false);
        setDrawingMode(!isDrawActive);
        setShowPalette(!isDrawActive);
        setIsDrawActive(!isDrawActive);
        setCanvasStyle({ cursor: 'url("/images/draw.svg") 0 32, auto' });
        if (ctx) {
            ctx.strokeStyle = currentColor;
        }
    };

    const handleRemoveClick = () => {
        setDrawingMode(true);
        setShowPalette(false);
        setShowEraser(!isRemoveActive);
        setIsDrawActive(false);
        setIsRemoveActive(!isRemoveActive);
        setCanvasStyle({ cursor: 'url("/images/remove.svg") 0 32, auto' });
        if (ctx) {
            ctx.strokeStyle = 'white';
        }
    };

    const changeColor = (color) => {
        setCurrentColor(color);
        if (isDrawActive && ctx) {
            ctx.strokeStyle = color;
        }
    };

    const clearRemove = () => {
    }    

    const drawIconStyle = isDrawActive && showPalette ? { fill: '#FF4836' } : {};
    const removeIconStyle = isRemoveActive && showEraser ? { fill: '#FF4836' } : {};

    return (
        <div>
            <div className={styles['capsule-container']}>
                <>
                    <p className={styles['title']}>나만의 타임캡슐을 꾸며주세요!</p>
                    <p className={styles['sub-title']}>여기서 만든 타임캡슐은 나의 편지와 메인 화면에 보여져요 :&#41;</p>
                </>
                
                <div className={styles['capsule-box']}>
                    <div className={styles['button']}>
                        <div className={styles['draw-container']}>
                            <div className={styles['draw-box']}>
                                <div className={styles['draw']} onClick={handleDrawClick}>
                                    <BsPen className={styles['draw-icon']} style={drawIconStyle} />
                                </div>
                            </div>

                            <div className={`${styles['palette-box']} ${!showPalette && styles['palette-hide']}`}>
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

                        <div className={styles['remove-container']}>
                            <div className={styles['remove-box']}>
                                <div className={styles['remove']} onClick={handleRemoveClick}>
                                    <PiEraser className={styles['remove-icon']} style={removeIconStyle} />
                                </div>
                            </div>

                            <div className={`${styles['eraser-box']} ${!showEraser && styles['eraser-hide']}`}>
                                <div className={styles['eraser']} ref={eraserRef}>
                                    <div className={styles['clear']} onClick={clearRemove}>clear</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles['canvas-rectangle']} style={canvasStyle}>
                        <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={drawing} onMouseLeave={finishDrawing} />
                    </div>

                    <div className={styles['canvas-circle']}>
                    </div>
                </div>
            </div>

            <Glass />
            <BackgroundImg />
        </div>
    );
};

export default Capsule;