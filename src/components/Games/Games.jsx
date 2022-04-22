import React from "react";

import styles from './Games.module.css'
import { NavLink } from 'react-router-dom'

import imgCheckCorrect from './../../assets/img/check-the-correct-one.svg';
import imgSelectTranslation from './../../assets/img/select-translation.svg';
import imgSpringGuess from './../../assets/img/sprint-guess.svg';
import imgPutTranslation from './../../assets/img/put-translation.svg';
import imgSpeakAndCheck from './../../assets/img/speak-and-check.svg';
import imgSpringListen from './../../assets/img/listen-sprint.svg';
import imgRememberTranslation from './../../assets/img/remember-translation.svg';
import imgWriteTranslation from './../../assets/img/write-translation.svg';
import imgListenAndGuess from './../../assets/img/listen-and-guess.svg';

    
const GAMES = [
    {img: imgCheckCorrect, path: 'check-it', name: 'Check correct word', description: 'Say the word on the screen and check your spelling'},
    {img: imgWriteTranslation, path: 'write-it', name: 'Write the translation', description: 'Say the word on the screen and check your spelling'},
    {img: imgSelectTranslation, path: 'select-it', name: 'Select the right translation', description: 'Say the word on the screen and check your spelling'},
    {img: imgSpringGuess, path: 'guess-it', name: 'Sprint by guessing', description: 'Say the word on the screen and check your spelling'},
    {img: imgPutTranslation, path: 'put-it', name: 'Put together a translation ', description: 'Say the word on the screen and check your spelling'},
    {img: imgSpeakAndCheck, path: 'speak-it', name: 'Speak and check', description: 'Say the word on the screen and check your spelling'},
    {img: imgSpringListen, path: 'listen-it', name: 'Sprint by listen', description: 'Say the word on the screen and check your spelling'},
    {img: imgRememberTranslation, path: 'remember-it', name: 'Remember translation', description: 'Say the word on the screen and check your spelling'},
    {img: imgListenAndGuess, path: 'listenandguess-it', name: 'Guess and listen', description: 'Say the word on the screen and check your spelling'}
]

export const Games = () => {


    return (
        <section className={styles.gameContainer}>
            {GAMES.map((game, index) => (
                <NavLink key={index} to={'/game/' + game.path}>
                    <div className={styles.gameBlock}>
                        <div>
                            <h2>{game.name}</h2>
                            <p>{game.description}</p>
                        </div>
                        <img src={game.img} alt="" />
                    </div>

                </NavLink>
            ))}
        </section>
    )
}