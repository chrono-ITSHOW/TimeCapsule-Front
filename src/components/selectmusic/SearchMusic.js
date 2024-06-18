import { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import axios from "axios";

export function SearchMusic({ setDataList, setSelectedMusic }) {
  const [inputValue, setValue] = useState("");

  const handleSearchInput = (e) => {
    if (e.key === "Enter") {
      searchMusic();
    }
  };

  const searchMusic = async function () {
    console.log(decodeURIComponent(inputValue));
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_HOST}/music/search`,
        {
          params: {
            query: decodeURIComponent(inputValue),
          },
        }
      );
      if (req.status === 200) {
        setDataList(req.data);
        setValue("");
      }
    } catch (error) {
      console.error("노래 검색 에러 발생", error);
    }
  };
  return (
    <InputBox>
      <Icon
        icon="basil:search-solid"
        width="24px"
        height="24px"
        style={{ color: "rgb(255, 255, 255, 0.3)" }}
      />
      <Input
        type="text"
        value={inputValue}
        placeholder="검색"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleSearchInput}
      />
    </InputBox>
  );
}
const InputBox = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50.2vw;
  height: 6.5vh;
  border: 2px solid rgb(255, 255, 255, 0.5);
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.25);
  z-index: 10;
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 90%;
  height: 29px;
  border: none;
  background-color: transparent;
  text-shadow: 0 0 10px #00000020;
  outline: none;
  margin-left: 0.7vw;
  font-size: 22px;
  color: rgb(255, 255, 255, 0.5);
  &::placeholder {
    color: rgb(255, 255, 255, 0.5);
  }
`;
