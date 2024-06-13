import React, { useState } from "react";
import Glass from "../components/Glass";
import Music from '../components/selectmusic/Music'
import styles from '../styles/SelectMusic.module.css'
import { Icon } from '@iconify/react';

function SelectMusic(){
    const [ inputValue, setValue ]= useState('');

    return(
       <div>
            <div className={styles['writeContainer']}>
                <div className={styles['inputContainer']}>
                    <div className={styles['titleBox']}>
                        <div>편지와 함께 기록할 노래를 선택해주세요!</div>
                        <span>나중에 편지로 받을 때 BGM이 될 음악이에요 :)</span>
                    </div>
                    <div className={styles['inputBox']}>
                    <Icon icon="basil:search-solid" width="24px" height="24px"  style={{color: "#C7C8CB"}} />
                    <input type="text" value={inputValue} onChange={(e) => setValue(e.target.value)} className={styles['inputStyle']}/>
                    </div>
                    <Music/>
                </div>
                <Glass/>
            </div>
       </div>
    )
}

export default SelectMusic; 