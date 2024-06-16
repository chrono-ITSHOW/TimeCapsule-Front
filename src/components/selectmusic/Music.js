import React, { useState, useEffect } from "react";
import MusicList from "./MusicList";
import { MusicCover } from "./MusicCover";
import { SearchMusic } from "./SearchMusic";
import axios from "axios";

function Music() {
  const [dataList, setDataList] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState({}); //선택된 음악

  //처음 실행 시 전체 리스트 불러오기
  useEffect(() => {
    const getAllMusic = async function () {
      try {
        const searchRes = await axios.get(
          `${process.env.REACT_APP_HOST}/music`
        );
        if (searchRes.status === 200) {
          console.log(searchRes.data);
          setDataList(searchRes.data);
          setSelectedMusic(searchRes.data[0]);
        }
      } catch (error) {
        console.error("노래 전체 리스트 가져오기 에러 발생", error);
      }
    };
    getAllMusic();

    console.log("dd");
  }, []);

  return (
    <>
      <SearchMusic setDataList={setDataList} />
      <div style={{ display: "flex", columnGap: "1.1vw" }}>
        <div>
          <MusicCover
            dataList={dataList}
            setDataList={setDataList}
            selectedMusic={selectedMusic}
          />
        </div>

        <MusicList
          dataList={dataList}
          selectedMusic={selectedMusic}
          setSelectedMusic={setSelectedMusic}
        />
      </div>
    </>
  );
}
export default Music;
