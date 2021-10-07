import React, { useState, useEffect } from 'react';
import './App.scss';
import { calcButtons, operartors } from './buttons.js';

function App() {
  const [output, setOutput] = useState('0');
  const [dotCounter, setDotCounter] = useState(0);
  const [metaCalc, setMetaCalc] = useState('');
  const regex = /[+\-*\/]/;

  const buts = calcButtons.map((button, index) => {
    const displayLogic = (prevOut) => {
      if (prevOut.length < 9) {
        if (prevOut === '0' && button.value === '0') {
          console.log(prevOut);
          return button.value;
        } else if (prevOut === '0' && button.value === '.') {
          setDotCounter(dotCounter + 1);
          return '0.';
        } else if (prevOut === '0' && button.value === '-') {
          return button.value;
        } else if (regex.test(button.value) == true) {
          setMetaCalc(metaCalc + prevOut + button.value);
          setDotCounter(0);
          setOutput('0');
          return null;
        } else if (dotCounter > 0 && button.value === '.') {
          return prevOut;
        } else if (prevOut === '0' && button.value !== '.') {
          return button.value;
        } else if (prevOut !== '0' && button.value !== '.') {
          return prevOut + button.value;
        } else if (
          prevOut !== '0' &&
          button.value === '.' &&
          dotCounter === 0
        ) {
          setDotCounter(dotCounter + 1);
          return prevOut + button.value;
        }
      } else if (prevOut.length == 9 && regex.test(button.value) == true) {
        setDotCounter(0);
        setOutput('0');
        return null;
      } else {
        return prevOut;
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
          return setOutput('0'), setDotCounter(0), setMetaCalc('');
        }}
      >
        clear
      </div>
      <div className='display' id='display'>
        {output}
      </div>
      <div className='display'>{metaCalc}</div>
      <div className='equal' id='equals'>
        =
      </div>
    </div>
  );
}

export default App;

/* let equ = '-10.99.*--0'
let noDoubleMinus = equ.replace(/\-\-/g, '+')
-------------------equ.replace(/\-\+|\+\-/g,'-')
let numbers = noDoubleMinus.split('*')
let calc = parseFloat(numbers[0])/parseFloat(numbers[1])

let result = parseFloat(equ)
console.log(calc)
console.log(numbers) */
