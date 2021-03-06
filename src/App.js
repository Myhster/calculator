import React, { useState, useEffect } from 'react';
import './App.scss';
import { calcButtons } from './buttons.js';

function App() {
  const [output, setOutput] = useState('0');
  const [dotCounter, setDotCounter] = useState(0);
  const [metaCalc, setMetaCalc] = useState(0);
  const [opSign, setOpSign] = useState();
  const [calcCount, setCalcCount] = useState(0);
  const numReg = /[1-9]/;

  function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }

  var math_it_up = {
    '+': function (x, y) {
      return x + y;
    },
    '-': function (x, y) {
      return x - y;
    },
    '*': function (x, y) {
      return x * y;
    },
    '/': function (x, y) {
      return x / y;
    },
  };

  const clear = () => {
    return [
      setOutput('0'),
      setDotCounter(0),
      setMetaCalc(0),
      setCalcCount(0),
      setOpSign(),
    ];
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
          //console.log(opSign);
          return button.value;
        }
        return prevOut + button.value;
      } //----------------------------^^^ StringNumbers ^^^----------------
      //----------------------------- Operators --------------------------
      //----------------------------------------Minus---------------------
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
          setOpSign('-');
          return null;
        } else {
          setMetaCalc(
            round(math_it_up[opSign](metaCalc, parseFloat(prevOut)), 5)
          );
          setDotCounter(0);
          setOutput('0');
          setOpSign('-');
          return null;
        }
      }
      //----------------------------------------Plus---------------------
      else if (button.value === '+') {
        setOpSign('+');
        if (prevOut === '0') {
          return '0';
        } else if (prevOut === '-0.' || prevOut === '-.') {
          return '-0.';
        } else if (prevOut === '-') {
          return '0';
        } else if (prevOut === '0.') {
          return '0.';
        } else if (metaCalc === 0 && calcCount < 1) {
          setMetaCalc(parseFloat(prevOut));
          setDotCounter(0);
          setOutput('0');
          setCalcCount(1);
          setOpSign('+');
          return null;
        } else {
          setMetaCalc(
            round(math_it_up[opSign](metaCalc, parseFloat(prevOut)), 5)
          );
          //setMetaCalc(round(metaCalc + parseFloat(prevOut), 5))
          setDotCounter(0);
          setOutput('0');
          setOpSign('+');
          return null;
        }
      } //----------------------------------------Multipcation---------------------
      else if (button.value === '*') {
        if (prevOut === '0') {
          setOpSign('*');
          return '0';
        } else if (prevOut === '-0.' || prevOut === '-.') {
          return '-0.';
        } else if (prevOut === '-') {
          return '-';
        } else if (prevOut === '0.') {
          return '0.';
        } else if (metaCalc === 0 && calcCount < 1) {
          setMetaCalc(parseFloat(prevOut));
          setDotCounter(0);
          setOutput('0');
          setCalcCount(1);
          setOpSign('*');

          return null;
        } else {
          setMetaCalc(
            round(math_it_up[opSign](metaCalc, parseFloat(prevOut)), 5)
          );

          setDotCounter(0);
          setOutput('0');
          setOpSign('*');
          return null;
        }
      } //3 + 5 * 6 - 2 / 4 should produce 32.5 or 11.5 as ----- 5 * - + 5an----------------------------------------Division---------------------
      else if (button.value === '/') {
        /* if (prevOut === '0') {
          return '0';
        } else */ if (prevOut === '-0.' || prevOut === '-.') {
          return '-0.';
        } else if (prevOut === '-') {
          return '-';
        } else if (prevOut === '0.') {
          return '0.';
        } else if (metaCalc === 0 && calcCount < 1) {
          setMetaCalc(parseFloat(prevOut));
          setDotCounter(0);
          setOutput('0');
          setCalcCount(1);
          setOpSign(() => '/');
          //console.log('first' + opSign);
          return null;
        } else {
          setMetaCalc(
            round(math_it_up[opSign](metaCalc, parseFloat(prevOut)), 5)
          );

          setDotCounter(0);
          setOutput('0');
          setOpSign(() => '/');
          //console.log(opSign);
          return null;
        }
      } //----------------------------------------Equal-Sign---------------------
      else if (button.value === '=') {
        if (prevOut === '0') {
          return '0';
        } else if (prevOut === '-0.' || prevOut === '-.') {
          return '-0.';
        } else if (prevOut === '-') {
          return '-';
        } else if (prevOut === '0.') {
          return '0.';
        } else if (metaCalc === 0 && calcCount < 1) {
          setMetaCalc(parseFloat(prevOut));
          setDotCounter(0);
          setOutput('0');
          setCalcCount(1);
          //setOpSign(() => '=');
          //console.log('first' + opSign);
          return null;
        } else {
          setMetaCalc(0);
          setDotCounter(0);
          setCalcCount(0);
          setOutput(
            round(math_it_up[opSign](metaCalc, parseFloat(prevOut)), 5)
          );
          //setOpSign(() => '=');
          //console.log('second' + opSign);
          return null;
        }
      }
    };
    //-------------------------------------------------------------------
    return (
      <div
        className={button.id + ' singleBtn btn btn-outline-secondary'}
        style={{ gridArea: button.id }}
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
  useEffect(() => {
    console.log(/* 'useEffect ' + opSign */);
  }, [opSign, metaCalc]);
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  return (
    <div className='App'>
      <div className=''>
        <h1 className='text-center' id='headline'>
          Calculator
        </h1>
        <div className='calculator'>
          <div className='metaCalc'>{metaCalc}</div>
          <div className='display' id='display'>
            {output}
          </div>
          {/* <div className='digitField'></div> */}
          {buts}
        </div>
      </div>
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
