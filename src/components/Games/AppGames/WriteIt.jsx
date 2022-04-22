import React, { useState, useMemo, useContext } from "react";
import { NavLink } from "react-router-dom";
import classes from './AppGames.module.css'
import styles from '../../../App.module.css'
import { ProgressBar } from "../../ProgressBar/ProgressBar";
import { Store } from "../../../context";

export const WriteIt = () => {

    const data = useContext(Store)
    const [text, setText] = useState('')

    const randomWords = useMemo(() => data.playWords.sort(() => Math.random() - 0.5),[data.points])

    const checkWord = (event) => {
        event.preventDefault();
        if (text === randomWords[data.wordIndex].translate) {
            data.speak(randomWords[data.wordIndex].translate)
            data.setCorrectWords(data.correctWords + 1)
            data.setPoints(state => state + 1)
            if(data.wordIndex !== data.playWords.length - 1){
                data.setWordIndex(data.wordIndex + 1)
            } else{
                alert('Game is over');
            } 
            setText('');
        } else {
            data.setErrorWords(data.errorWords + 1)
        }
    }

    const changeText = (e) => setText(e.target.value)

    return (
        <div>
            <ProgressBar library={data.library} wordIndex={data.wordIndex}/>
            <nav className={styles.gameNav}>
                <NavLink className={styles.btnBack} to='/games' />
                <ul className={styles.results}>
                    <li>Errors: {data.errorWords}</li>
                    <li>Correct: {data.correctWords}</li>
                    <li>Points: {data.points}</li>
                </ul>
            </nav>
            
            <section className={classes.gameContainer}>
                <span>Write a translation for this word</span>
                <h3>{randomWords[data.wordIndex].word}</h3>
                    <form onSubmit={checkWord} className={classes.writeWordBlock}>
                        <input onChange={changeText} value={text} type='text' />
                        <button className={classes.btnOk}>OK</button>
                    </form>
            </section>
        </div>
        
    )
}