import React, { useState, useEffect } from 'react';
import './App.scss';
import { calcButtons, operartors } from './buttons.js';

function App() {
  const [output, setOutput] = useState('0');
  let counter = 0;

  const buts = calcButtons.map((button, index) => {
    const displayLogic = (prevOut) => {
      if (prevOut == '0' && output.length == 1) {
        counter++;
        console.log(counter);
        return button.value;
      } else {
        console.log(prevOut);
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
      <div className className='digitField'>
        {buts}
      </div>
      <div>{ops}</div>
      <div className='digitBtn' id='clear' onClick={() => setOutput('0')}>
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
