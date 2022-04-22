import React, { useEffect, useContext } from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import styles from '../../App.module.css'
import { Store } from "../../context";

export const Learn = () => {

    const data = useContext(Store)

    useEffect(()=>{
        data.speak(data.library[data.wordIndex].translate)
    },[data.wordIndex])


    const clicked = () => {
        {data.wordIndex === data.library.length - 1 ? data.setWordIndex(0) : data.setWordIndex(data.wordIndex + 1)}
    }
    

    return (
        <div>
            <ProgressBar library={data.library} wordIndex={data.wordIndex}/>
            <section style={{textAlign:'center'}} >
                <span>{data.library[data.wordIndex].word}</span>
                <h3>{data.library[data.wordIndex].translate}</h3>
            </section>
            <div onClick={() => clicked()} className={styles.btnNext}></div>
        </div>
        
    )
}