import React, { useState, useEffect, useRef } from 'react';
import Glass from '../commponents/Glass';
import BackgroundImg from '../commponents/BackgroundImg';
import styles from '../styles/Capsule.module.css'

import { BsPen } from "react-icons/bs";
import { PiEraser } from "react-icons/pi";

const Capsule = () => {

    // canvas 그리기
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

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

    const handleDrawClick = (context) => {
        setIsDrawActive(true);
        setIsRemoveActive(false);
        setDrawingMode(true);
        ctx.strokeStyle = 'black';
    };

    const handleRemoveClick = (context) => {
        setIsDrawActive(false);
        setIsRemoveActive(true); 
        ctx.strokeStyle = 'white';
    };

    const drawIconStyle = isDrawActive ? { fill: '#FF4836', cursor: 'url("/images/draw.svg"), auto' } : {};
    const removeIconStyle = isRemoveActive ? { fill: '#FF4836', cursor: 'url("/images/remove.svg"), auto' } : {};

    return (
        <div>
            <div className={styles['capsuleContainer']}>
                <>
                    <p className={styles['title']}>나만의 타입캡슐을 꾸며주세요!</p>
                    <p className={styles['sub-title']}>여기서 만든 타임캡슐은 나의 편지와 메인 화면에 보여져요 :&#41;</p>
                </>
                
                <div className={styles['capsuleBox']}>
                    <div className={styles['button']}>

                        <div className={styles['draw']} onClick={handleDrawClick}>
                            <BsPen className={styles['draw-icon']} style={drawIconStyle} />
                        </div>
                        <div className={styles['remove']} onClick={handleRemoveClick}>
                            <PiEraser className={styles['remove-icon']} style={removeIconStyle} />
                        </div>
                    </div>

                    <div className={styles['canvasRectangle']}>
                        <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={drawing} onMouseLeave={finishDrawing}></canvas>
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