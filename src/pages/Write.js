import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Glass from '../commponents/\bGlass';
import BackgroundImg from '../commponents/BackgroundImg';
import Input from '../commponents/input';
import styles from '../styles/Write.module.css'

const Write = () => {
  const [inputText, setInputText] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isHeightExceeded, setIsHeightExceeded] = useState(false);
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}.${month}. ${day}`;

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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const styledTextElement = document.getElementById('styledText');
    if (styledTextElement.scrollHeight <= 450) {
      setIsHeightExceeded(false);
    } else {
      setIsHeightExceeded(true);
    }
  }, [inputText]);

  return (
    <div>
        <div className={styles['writeContainer']}>
            <div className={styles['inputContainer']}>
                <Input type="email" text='나의 편지를 보낼 이메일을 작성해주세요!'/>
                <textarea 
                  value={inputText} 
                  type="text"  
                  placeholder='편지 내용을 작성해주세요!' 
                  onChange={handleInputChange} 
                  className={`${styles['textareaStyle']} ${isHeightExceeded ? styles['textareaError'] : ''}`}></textarea>
                <div className={styles["check"]}>
                    <input type="checkbox" className={styles["check1"]} onChange={handleCheckboxChange}></input>
                    <label for="check1" style={{fontSize:"24px"}}>2025년의 너에게</label>
                </div>
            </div>
            <div className={styles['letterContainer']}>
                <div style={{color:"#FF918A", textAlign:"center"}}>
                <div style={{width:"54px", height:"54px", marginBottom:"26px"}}></div>
                  {formattedDate}
                  </div>
                <div>{generateStyledText()}</div>
                {isChecked && <p className={styles['checkText']}>2025년의 너에게</p>}
            </div>
            {isHeightExceeded && <div className={styles['ErrorStyle']}>글자 수가 초과했습니다</div>}
        </div>
        <Glass />
        <BackgroundImg />
    </div>
  );
};

export default Write;