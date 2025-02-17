import React from 'react';
import './App.css';
import Guesser from './components/Guesser.tsx';
import Rules from './components/Rules.tsx';
import Menu from './components/Menu.tsx';
import {useState} from 'react';

function App() {

  const [playing , setPlaying] = useState(false);
  const [rules, setRules] = useState(false);

  return (
    <div>
      <video src = "./ChipsNoBackground.mp4" autoPlay loop muted className="absolute object-cover w-full h-full z-0" />
      <div className="min-h-screen  flex items-center justify-center z-1">

      <div className= "text-center p-7 rounded-lg bg-green-900 shadow-2xl max-w-3xl w-full mx-4 absolute">
        <h1 className = "text-5xl font-bold mb-6 text-white bg-clip-text" >Blackjack Helper</h1>
          {!playing && !rules && <Menu setPlaying={setPlaying} setRules={setRules} />}
          {playing && <Guesser setPlaying={setPlaying}/>}
          {rules && <Rules setRules={setRules}/>}
      </div>
    </div>
    </div>
    
  );
}

export default App;
