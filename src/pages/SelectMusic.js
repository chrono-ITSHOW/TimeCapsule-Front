import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Glass from "../components/Glass";
import Music from "../components/selectmusic/Music";
import styles from "../styles/SelectMusic.module.css";
import BackgroundImg from "../components/BackgroundImg";
import axios from "axios";

function SelectMusic() {
  const seletedMusicRef = useRef({});
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const sendImage = async () => {
    try {
      const request = await axios.patch(
        `${process.env.REACT_APP_HOST}/letters/${userId}/music`,
        seletedMusicRef.current
      );
      console.log(request.status);
      if (request.status === 200) {
        console.log("음악 선택 완료", request.status);
        navigate(`/write`);
      }
    } catch (error) {
      console.error("음악 선택 실패", error);
    }
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
