import React, { useState } from "react";
import MusicList from "./MusicList";
import styles from '../../styles/Music.module.css'

function Music(){
    const [musicCover , setMusicCover] = useState();
    const [ list, setList ] = useState([{text: 'Magnetic - 아일릿(ILLIT)'}, {text: 'Magnetic - 아일릿(ILLIT)'}]);

   
    const selectMusic = (clickIndex) => {
       setList(list.map((item, i) => {
        return clickIndex === i ? { ...item, clicked: !item.clicked } :  { ...item, clicked: false }
       } ))
       setMusicCover(list[clickIndex].cover)
    }
 
    return(
        <div style={{display:'flex', columnGap: '1.1vw'}}>
            <img className={styles['musicCover']} src={musicCover}/>
            <MusicList list={list} selectMusic={selectMusic}/>
        </div>
    )
}
export default Music;