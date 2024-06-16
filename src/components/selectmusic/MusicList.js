import React, { useEffect } from "react";
import MusicItem from "./MusicItem";
import styles from "../../styles/MusicList.module.css";
function MusicList({ dataList, selectedMusic, setSelectedMusic }) {
  const isSelected = (selectedData) => {
    console.log(selectedData);
    return selectedMusic === selectedData;
  };

  const selectMusicItem = (item) => {
    if (isSelected(item)) {
      setSelectedMusic(item);
    }
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
