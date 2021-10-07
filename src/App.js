import React, { useState } from 'react';
import './App.scss';
import { calcButtons } from './buttons.js';

function App() {
  const [output, setOutput] = useState('0');
  const [dotCounter, setDotCounter] = useState(0);
  const [metaCalc, setMetaCalc] = useState(0);
  const [opSign, setOpSign] = useState();
  const [calcCount, setCalcCount] = useState(0);
  const numReg = /[1-9]/;

  const clear = () => {
    return [setOutput('0'), setDotCounter(0), setMetaCalc(0), setCalcCount(0)];
  };

  const buts = calcButtons.map((button, index) => {
    const displayLogic = (prevOut) => {
      if (button.value === 'clear') {
        return clear();
      } else if (button.value === '0') {
        if (prevOut === '0') {
          return '0';
        } else if (prevOut === '-') {
          setDotCounter(1);
          return '-0.';
        } else {
          return prevOut + button.value;
        }
      } else if (button.value === '.') {
        if (prevOut === '0') {
          setDotCounter(1);
          return '0.';
        } else if (prevOut === '-') {
          setDotCounter(1);
          return '-0.';
        } else if (prevOut !== '0' && dotCounter < 1) {
          setDotCounter(1);
          return prevOut + '.';
        } else if (prevOut !== '0' && dotCounter === 1) {
          return prevOut;
        }
      } else if (numReg.test(button.value) === true) {
        if (prevOut === '0') {
          return button.value;
        }
        return prevOut + button.value;
      } //----------------------------^^^ StringNumbers ^^^----------------
      else if (button.value === '-') {
        if (prevOut === '0') {
          return '-';
        } else if (prevOut === '-0.' || prevOut === '-.') {
          return '0.';
        } else if (prevOut === '-') {
          return '0';
        } else if (prevOut === '0.') {
          return '-0.';
        } else if (metaCalc === 0 && calcCount < 1) {
          setMetaCalc(parseFloat(prevOut));
          setDotCounter(0);
          setOutput('0');
          setCalcCount(1);
          return null;
        } else {
          setMetaCalc(metaCalc - parseFloat(prevOut));
          setDotCounter(0);
          setOutput('0');
          return null;
        }
      }
    };
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
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
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------

  return (
    <div className='App'>
      <div className='digitField'>{buts}</div>
      <div className='display' id='display'>
        {output}
      </div>
      <div className='metaCalc'>{metaCalc}</div>
    </div>
  );
}

export default App;

/* let equ = '-10.99.*--0'
let noDoubleMinus = equ.replace(/\-\-/, '+')
-------------------equ.replace(/\-\+|\+\-/g,'-')
let numbers = noDoubleMinus.split('*')
let calc = parseFloat(numbers[0])/parseFloat(numbers[1])

let result = parseFloat(equ)
console.log(calc)
console.log(numbers) */
