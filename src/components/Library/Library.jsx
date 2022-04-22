import React, { useState, useContext } from "react";
import styles from './Library.module.css'
import addBtn from './../../assets/img/add.svg'
import deleteBtn from './../../assets/img/delete.svg'
import { Store } from "../../context";

export const Library = () => {
    const [textInput, setTextInput] = useState('')
    const data = useContext(Store)

    const changeTextInput = e => setTextInput(e.target.value)


    const deleteWord = (id) => {
        const updateLibrary = data.library.filter((word, index) => index !== id)
        data.setLibrary(updateLibrary)
        localStorage.setItem('library', JSON.stringify(updateLibrary))
    }
    const addNewWord = async (event) => {
        event.preventDefault()
        const response = await fetch(`http://tmp.myitschool.org/API/translate/?source=ru&target=en&word=${textInput}`)
        const translation = await response.json()
        const updateLibrary = [...data.library, {word: translation.word, translate: translation.translate, learn: 0}]
        data.setLibrary(updateLibrary)
        localStorage.setItem('library', JSON.stringify(updateLibrary))
        setTextInput('')
    }

    return (
        <section className={styles.libraryBlock}>
            <span>Add new <b>Word</b></span>
            <form onSubmit={addNewWord} className={styles.addWordBlock}>
                <input value={textInput} type="text" onChange={changeTextInput} />
                <button>
                    <img src={addBtn}/>
                </button>
            </form>

            <div className={styles.wordsTable}>
                <ul>
                    <li> <h3>Word</h3></li>
                    <li> <h3>Translation</h3></li>
                    <li> <h3>Learn</h3></li>
                </ul>

                {data.library.map((word, index) => (
                    <ul key={index}>
                        <li>{word.word}</li>
                        <li>{word.translate}</li>
                        <li>{word.learn}</li>

                        <div className={styles.settings}>
                            <button onClick={() =>deleteWord(index)}>
                                <img src={deleteBtn} />
                            </button>
                        </div>
                    </ul>
                ))}
            </div>
        </section>
    )
}