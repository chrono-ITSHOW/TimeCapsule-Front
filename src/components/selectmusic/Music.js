import React, { useState, useEffect, useRef } from "react";
import MusicList from "./MusicList";
import { MusicCover } from "./MusicCover";
import { SearchMusic } from "./SearchMusic";
import axios from "axios";

function Music({ seletedMusicRef }) {
  const [dataList, setDataList] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState({}); //선택된 음악
  const [isPlayMusic, setPlayMusic] = useState(false);
  const audioRef = useRef(null);
  seletedMusicRef.current = { music_id: selectedMusic.id };

  //처음 실행 시 전체 리스트 불러오기
  useEffect(() => {
    const getAllMusic = async function () {
      try {
        const searchRes = await axios.get(
          `${process.env.REACT_APP_HOST}/music`
        );
        if (searchRes.status === 200) {
          setDataList(searchRes.data);
          setSelectedMusic(searchRes.data[0]);
        }
      } catch (error) {
        console.error("노래 전체 리스트 가져오기 에러 발생", error);
      }
    };
    getAllMusic();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1.1vw" }}>
      <SearchMusic
        setDataList={setDataList}
        setSelectedMusic={setSelectedMusic}
      />
      <div style={{ display: "flex", columnGap: "1.1vw" }}>
        <div>
          <MusicCover
            dataList={dataList}
            setDataList={setDataList}
            selectedMusic={selectedMusic}
            setSelectedMusic={setSelectedMusic}
            audioRef={audioRef}
            isPlayMusic={isPlayMusic}
            setPlayMusic={setPlayMusic}
          />
        </div>

        <MusicList
          dataList={dataList}
          selectedMusic={selectedMusic}
          setSelectedMusic={setSelectedMusic}
          audioRef={audioRef}
          isPlayMusic={isPlayMusic}
          setPlayMusic={setPlayMusic}
        />
      </div>
    </div>
  );
}
export default Music;
