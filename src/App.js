import React, { useState } from 'react';

export default function App() {
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');

  const ops = ['/', '*', '-', '+', '.'];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === '') ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc((prevCalc) => prevCalc + value);
  };

  const calculateResult = () => {
    try {
      const calculatedResult = eval(calc).toString();
      setCalc(calculatedResult);
      setResult(calculatedResult);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleButtonClick = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      setCalc('');
      setResult('');
    } else {
      updateCalc(value);
    }
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => updateCalc(i.toString())}>
          {i}
        </button>
      );
    }

    return digits;
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <div className="input">{calc || '0'}</div>
          {/* <div className="result">{result}</div> */}
        </div>

        <div className="operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button id='clear' onClick={() => handleButtonClick('C')}>C</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button id='equals' onClick={() => handleButtonClick('=')}>=</button>
        </div>
      </div>
    </div>
  );
}
