import React, { useEffect, useState, useMemo, useContext} from "react";
import { NavLink } from "react-router-dom";
import classes from './AppGames.module.css'
import styles from '../../../App.module.css'
import { ProgressBar } from "../../ProgressBar/ProgressBar";
import { Store } from "../../../context";

export const CheckIt = () => {
    
    const data = useContext(Store)
    const [currentWords, setCurrentWords] = useState(['firstButton', 'correct', 'secondButton']);
    const randomWords = useMemo(() => data.playWords.sort(() => Math.random() - 0.5), [])
    


    useEffect(() => {
        setCurrentWords([
            randomWords[data.wordIndex].translate,
            randomWords[(data.wordIndex + 1)%randomWords.length].translate,
            randomWords[(data.wordIndex + 2)%randomWords.length].translate,
        ].sort(() => Math.random() - 0.5))
    }, [data.correctWords])

    const checkWord = (word) => {
        if (word === randomWords[data.wordIndex].translate) {
            data.speak(randomWords[data.wordIndex].translate)
            data.setCorrectWords(data.correctWords + 1);
            data.setPoints(state => state + 1)
            if(data.wordIndex !== data.playWords.length - 1){
                data.setWordIndex(data.wordIndex + 1)
            } else{
                alert('Game is over');
            } 
        } else {
            data.setErrorWords(data.errorWords + 1)
        }
    }
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
                <span>choose this word</span>
                <h3>{randomWords[data.wordIndex].word}</h3>
                <ul className={classes.btnContainer}>
                    {currentWords.map((word,index) => (
                        <li key={index} className={classes.btnCheck} onClick={() => checkWord(word)}>{word}</li>
                    ))}

                </ul>
            </section>
        </div>
        
    )
}