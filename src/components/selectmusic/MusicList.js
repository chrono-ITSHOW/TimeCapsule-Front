import React from "react"
import MusicItem from "./MusicItem"
import styles from '../../styles/MusicList.module.css'
function MusicList({list, selectMusic}){

    return (
        <div className={styles['musicList']}>
            {
                list.map((item, index) => {
                    return(
                    <MusicItem item={item} index={index} selectMusic={selectMusic} key={index}/>
                    )  
                }) 
            }
        </div>
    )
}

export default MusicList;