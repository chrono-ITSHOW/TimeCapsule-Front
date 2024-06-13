import React from "react";
import { Icon } from '@iconify/react';
import styles from '../../styles/MusicItem.module.css'


function MusicItem({item, index, selectMusic}){
    return(

         <div className={styles['musicItem']} onClick={()=>selectMusic(index)} key={index}>
            <div style={{  width: 20, height: 20, fontSize: 20, fontWeight: 500, color:'rgba(0, 0, 0, 0.63)' }} className={styles['icondiv']}>{item.clicked ? <Icon icon="ph:play-fill" width="16px" height="16px" style={{color: 'rgba(0, 0, 0, 0.63)'}} className={styles['icon']}/> : index+1}</div>
            <span style={{ fontSize : 15, fontWeight: 400, color:'rgba(0, 0, 0, 0.63)', lineHeight: 20, position:"relative", top:1 }}>{item.text}</span>
        </div>
    )
}
export default MusicItem;