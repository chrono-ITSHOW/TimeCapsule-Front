import React from "react";
import { Icon } from "@iconify/react";
import styles from "../../styles/MusicItem.module.css";

function MusicItem({ item, index, selectMusicItem, isSelected }) {
  return (
    <div
      className={styles["musicItem"]}
      onClick={() => selectMusicItem(item)}
      style={{ backgroundColor: isSelected ? "white" : "transparent" }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          fontSize: 20,
          fontWeight: 500,
          color: "rgba(0, 0, 0, 0.63)",
        }}
        className={styles["icondiv"]}
      >
        {isSelected ? (
          <Icon
            icon="ph:play-fill"
            width="16px"
            height="16px"
            style={{ color: "rgba(0, 0, 0, 0.63)" }}
            className={styles["icon"]}
          />
        ) : (
          index + 1
        )}
      </div>
      <span
        style={{
          fontSize: 15,
          fontWeight: 400,
          color: "rgba(0, 0, 0, 0.63)",
          height: 16,
          width: "fit-content",
        }}
      >
        {item.title}
      </span>
    </div>
  );
}
export default MusicItem;
