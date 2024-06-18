import React from "react";
import { useNavigate } from "react-router-dom";
import Glass from "../components/Glass";
import Music from "../components/selectmusic/Music";
import styles from "../styles/SelectMusic.module.css";
import BackgroundImg from "../components/BackgroundImg";
function SelectMusic({ seletedMusicRef }) {
  const navigate = useNavigate();
  const sendImage = () => {
    navigate(`/write`);
  };
  return (
    <div>
      <div className={styles["writeContainer"]}>
        <div className={styles["inputContainer"]}>
          <div className={styles["titleBox"]}>
            <div>편지와 함께 기록할 노래를 선택해주세요!</div>
            <span>나중에 편지로 받을 때 BGM이 될 음악이에요 :)</span>
          </div>
          <Music seletedMusicRef={seletedMusicRef} />
        </div>
      </div>
      <Glass sendImage={sendImage} />
      <BackgroundImg />
    </div>
  );
}

export default SelectMusic;
