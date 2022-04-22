import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie'
import { Header } from './components/Header/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Library } from './components/Library/Library'
import { Learn } from './components/Learn/Learn';
import { Games } from './components/Games/Games';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Store } from './context';
import { games } from './components/Games/index';

export const App = () => {
  const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library')) || [])
  const [wordIndex, setWordIndex] = useState(0)
  const [playWords, setPlayWords] = useState(library.slice(-10));
  const [correctWords, setCorrectWords] = useState(0);
  const [errorWords, setErrorWords] = useState(0);
  const [cookie, setCookie] = useCookies(['points'])
  const [points, setPoints] = useState(+cookie.points || 0);


  useEffect(() => {
    if(correctWords){
      setCookie('points', points + 1)
    }
  }, [correctWords])

  const speak = (word) => {
    const speakInstance = new SpeechSynthesisUtterance(word);
    speakInstance.voice = speechSynthesis.getVoices()[1]
    speechSynthesis.speak(speakInstance)
  }  
  return (
    <div>
      <BrowserRouter>
      <Store.Provider value={{correctWords, setCorrectWords, errorWords, setErrorWords, playWords, library, setLibrary, wordIndex, setWordIndex, points, setPoints, speak}}>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard points={points} />} />
          <Route path='/library' element={<Library />} />
          <Route path='/games' element={<Games />} />
          {games.map((game, index) => <Route key={index} path={`/game/${game.path}`} element={<game.component/>} />)}
          
          <Route path='/learn' element={<Learn />} />
        </Routes>

        </Store.Provider>
      </BrowserRouter>  
    </div>
  );
}

