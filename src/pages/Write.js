import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Glass from "../components/Glass";
import BackgroundImg from "../components/BackgroundImg";
import Input from "../components/input";
import styles from "../styles/Write.module.css";
import popupStyles from "../styles/Popup.module.css";
import { Icon } from "@iconify/react";

const Write = ({ seletedMusicRef }) => {
  //seletedMusicRef : 사용자가 선택한 음악 정보를 담고 있음
  const [inputText, setInputText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isHeightExceeded, setIsHeightExceeded] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;

  const generateStyledText = () => {
    const textWithLineBreaks = inputText.split("\n").map((line, index) => (
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

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleSend = () => {
    handlePopupClose();
  };

  useEffect(() => {
    const styledTextElement = document.getElementById("styledText");
    if (styledTextElement.scrollHeight <= 450) {
      setIsHeightExceeded(false);
    } else {
      setIsHeightExceeded(true);
    }
  }, [inputText]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles["writeContainer"]}>
          <div className={styles["inputContainer"]}>
            <Input
              type="email"
              text="나의 편지를 보낼 이메일을 작성해주세요!"
            />
            <textarea
              value={inputText}
              type="text"
              placeholder="편지 내용을 작성해주세요!"
              onChange={handleInputChange}
              className={`${styles["textareaStyle"]} ${
                isHeightExceeded ? styles["textareaError"] : ""
              }`}
            ></textarea>
            <div className={styles["check"]}>
              <input
                type="checkbox"
                className={styles["check1"]}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="check1" style={{ fontSize: "20px" }}>
                2025년의 너에게
              </label>
            </div>
          </div>
          <div className={styles["letterContainer"]}>
            <div style={{ color: "#FF918A", textAlign: "center" }}>
              <div
                style={{ width: "54px", height: "54px", marginBottom: "26px" }}
              ></div>
              {formattedDate}
            </div>
            <div style={{ height: "450px", overflow: "hidden" }}>
              {generateStyledText()}
            </div>
            {isChecked && (
              <p className={styles["checkText"]}>2025년의 너에게</p>
            )}
          </div>
          {isHeightExceeded && (
            <div className={styles["ErrorStyle"]}>글자 수가 초과했습니다</div>
          )}
        </div>
      </div>
      <div></div>
      <Glass onPopupOpen={handlePopupOpen} />

      <BackgroundImg />
      {isPopupOpen && (
        <div className={popupStyles["popupBackground"]}>
          <div className={popupStyles["popupStyle"]}>
            <Icon
              icon="solar:letter-linear"
              className={popupStyles["iconStyle"]}
            />
            <p style={{ fontSize: "24px", color: "#000", textShadow: "none" }}>
              편지를 전송할까요?
            </p>
            <p
              style={{ fontSize: "16px", color: "#CDCDCD", textShadow: "none" }}
            >
              확인을 누르시면 이전으로 돌아갈 수 없어요
            </p>
            <button className={popupStyles["btnStyle"]} onClick={handleSend}>
              전송하기
            </button>
          </div>
          <p style={{ fontSize: "20px" }} onClick={handlePopupClose}>
            이어서 작성하기
          </p>
        </div>
      )}
    </div>
  );
};

export default Write;
