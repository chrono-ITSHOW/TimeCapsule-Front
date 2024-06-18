import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { BsFillSkipEndFill, BsFillSkipStartFill } from "react-icons/bs";

export function MusicCover({
  setDataList,
  dataList,
  selectedMusic,
  setSelectedMusic,
  audioRef,
  isPlayMusic,
  setPlayMusic,
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const currentRef = useRef(0);
  const [toggleButton, setToggleButton] = useState(false); //true 면 재생, false 면 안함요

  useEffect(() => {
    console.log(selectedMusic);
    if (selectedMusic.music_file) {
      const newAudio = new Audio(
        process.env.REACT_APP_HOST + selectedMusic.music_file
      );
      // if (toggleButton) {
      //   audioRef.current.currentTime = currentRef.current;
      // }

      audioRef.current = newAudio;
      audioRef.current.currentTime = 0;

      audioRef.current.volume = 0.1; // Volume setting

      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

      if (isPlayMusic) {
        audioRef.current.play().catch((error) => {
          console.error("Failed to start playing:", error);
        });
      }

      return () => {
        audioRef.current.pause();
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [selectedMusic]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlayMusic) {
        audioRef.current.play().catch((error) => {
          console.error("노래 재생 실패:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlayMusic]);

  const togglePlayMusic = () => {
    setPlayMusic((prev) => !prev);
    if (audioRef.current) {
      if (isPlayMusic) {
        currentRef.current = audioRef.current.currentTime;
      }
    }
    setToggleButton(true);
  };

  const onBackward = () => {
    const currentIndex = dataList.indexOf(selectedMusic);
    console.log("onBackward", currentIndex);
    if (currentIndex > 0) {
      setSelectedMusic(dataList[currentIndex - 1]);
    }
    // setSelectedMusic(dataList[currentIndex]);
  };

  const onForward = () => {
    const currentIndex = dataList.indexOf(selectedMusic);
    console.log("forward", currentIndex);

    if (currentIndex < dataList.length - 1) {
      setSelectedMusic(dataList[currentIndex + 1]);
    }
    // setSelectedMusic(dataList[currentIndex]);
  };

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "20.8vw",
          height: "37vh",
          borderRadius: 15,
          overflow: "hidden",
        }}
      >
        <GradationCover />
        <MusicCoverImg
          src={`${process.env.REACT_APP_HOST}${selectedMusic.music_img_path}`}
        />
        <MusciPlayerContainer>
          <PlayButtonBox>
            <div onClick={onBackward}>
              <BsFillSkipStartFill style={{ width: 25, fontSize: 25 }} />
            </div>
            <div onClick={togglePlayMusic}>
              {isPlayMusic ? (
                <FaPause style={{ width: 24, fontSize: 24 }} />
              ) : (
                <FaPlay style={{ fontSize: 24, width: 24 }} />
              )}
            </div>
            <div onClick={onForward}>
              <BsFillSkipEndFill style={{ fontSize: 25, width: 25 }} />
            </div>
          </PlayButtonBox>
          <MusicPrograssBar
            min={0}
            max={100}
            value={duration ? (currentTime / duration) * 100 : 0}
          />
        </MusciPlayerContainer>
      </div>
    </div>
  );
}
const MusicPrograssBar = styled.progress`
  width: 17.5vw;
  height: 5px;
  appearance: none;
  margin-bottom: 3vh;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  &::-webkit-progress-bar {
    background-color: white;
    border-radius: 10px;
  }
  &::-webkit-progress-value {
    width: 50%;
    border-radius: 10px;
    background-color: #ff6a6a;
  }
  z-index: 20;
`;
const MusciPlayerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
  row-gap: 3.4vh;
  position: absolute;
  bottom: 0;
`;
const PlayButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 3vw;
  z-index: 20;
`;
const MusicCoverImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 15px;
  object-fit: cover;
  z-index: 9;
`;
const GradationCover = styled.div`
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.17)
  );
  width: 100%;
  height: 100%;
  position: absolute;
  /* width: 20.8vw;
  height: 37vh; */
  z-index: 10;
`;
