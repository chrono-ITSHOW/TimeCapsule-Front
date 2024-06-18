import React, { useEffect } from "react";
import MusicItem from "./MusicItem";
import styles from "../../styles/MusicList.module.css";
function MusicList({
  dataList,
  selectedMusic,
  setSelectedMusic,
  audioRef,
  isPlayMusic,
  setPlayMusic,
}) {
  const isSelected = (selectedData) => {
    return selectedData.id === selectedMusic.id;
  };
  const selectMusicItem = (item) => {
    setSelectedMusic(item);

    //TODO: 수정필요
    audioRef.current.load();
    audioRef.current.autoplay = true;
    setPlayMusic(true);
  };

  return (
    <div className={styles["musicList"]}>
      {dataList.map((item, index) => (
        <MusicItem
          item={item}
          index={index}
          isSelected={isSelected(item)}
          selectMusicItem={selectMusicItem}
          key={index}
        />
      ))}
    </div>
  );
}

export default MusicList;
