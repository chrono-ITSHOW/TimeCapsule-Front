import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useState } from "react";
export function MusicCover({ setDataList, dataList, selectedMusic }) {
  const [isPlayMusic, setPlayMusic] = useState(true); //true 면 음악 재생, false면 음악 재생 중단
  const handleStateMusic = () => setPlayMusic((prev) => !prev);
  // console.log(`${process.env.REACT_APP_HOST}${selectedMusic.music_img_path}`);
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
            <div>
              <Icon
                icon="ri:skip-back-fill"
                width="24"
                height="24"
                style={{ color: "#ffff" }}
              />
            </div>
            {isPlayMusic ? (
              <div onClick={handleStateMusic}>
                <Icon
                  icon="ph:play-fill"
                  width="24"
                  height="24"
                  style={{ color: "#ffff" }}
                />
              </div>
            ) : (
              <div onClick={handleStateMusic}>
                <Icon
                  icon="ph:stop-fill"
                  width="24"
                  height="24"
                  style={{ color: "#ffff" }}
                />
              </div>
            )}
            <div>
              <Icon
                icon="ri:skip-back-fill"
                width="24"
                height="24"
                style={{ color: "#ffff", transform: "rotateY(180deg)" }}
              />
            </div>
          </PlayButtonBox>
          <MusicPrograssBar min={0} max={100} value={50} />
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
