import React, { useState, useEffect } from 'react';
import './App.scss';
import { calcButtons, operartors } from './buttons.js';

function App() {
  const [output, setOutput] = useState('0');
  const [dotCounter, setDotCounter] = useState(0);

  const buts = calcButtons.map((button, index) => {
    const displayLogic = (prevOut) => {
      if (prevOut === '0' && button.value === '0') {
        console.log(prevOut);
        return button.value;
      } else if (prevOut === '0' && button.value === '.') {
        setDotCounter(dotCounter + 1);
        console.log(dotCounter);
        return '0.';
      } else if (prevOut === '0.' && button.value === '.') {
        return '0.';
      } else if (prevOut === '0' && button.value !== '.') {
        console.log(dotCounter);
        return button.value;
      } else if (prevOut !== '0' && button.value !== '.') {
        console.log(dotCounter);
        return prevOut + button.value;
      } else if (prevOut !== '0' && button.value === '.' && dotCounter === 0) {
        setDotCounter(dotCounter + 1);
        console.log(dotCounter);
        return prevOut + button.value;
      }
    };

    return (
      <div
        className='digitBtn text-center'
        key={index}
        id={button.id}
        onClick={() => setOutput(displayLogic)}
      >
        {button.value}
      </div>
    );
  });

  const ops = operartors.map((op, index) => {
    return (
      <div className='operatorBtn digitBtn' key={index} id={op.id}>
        {op.value}
      </div>
    );
  });

  return (
    <div className='App'>
      <div className='digitField'>{buts}</div>
      <div>{ops}</div>
      <div
        className='digitBtn'
        id='clear'
        onClick={() => {
          return setOutput('0'), setDotCounter(0);
        }}
      >
        clear
      </div>
      <div className='display' id='display'>
        {output}
      </div>
      <div className='equal' id='equals'>
        =
      </div>
    </div>
  );
}

export default App;
