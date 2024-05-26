import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('0');
  const [memory, setMemory] = useState(null);
  const [history, setHistory] = useState([]);


  const calculateResult = (input) => {
    try {
      let result;
      const operators = ['+', '-', '*', '/', '%'];
      let operator = null;

      for (let i = 0; i < operators.length; i++) {
        if (input.includes(operators[i])) {
          operator = operators[i];
          break;
        }
      }

      if (input.trim() === '') {
        setInput('');
        return;
      }

      const [firstNumber, secondNumber] = input.split(operator);
      switch (operator) {
        case '+':
          result = Number(firstNumber) + Number(secondNumber);
          break;
        case '-':
          result = Number(firstNumber) - Number(secondNumber);
          break;
        case '*':
          result = Number(firstNumber) * Number(secondNumber);
          break;
        case '/':
          result = Number(firstNumber) / Number(secondNumber);
          break;
        case '%':
          result = Number(firstNumber) % Number(secondNumber);
          break;
        default:
          throw new Error('Invalid operator');
      }

      setHistory(prevHistory => [...prevHistory, { expression: input, result: result.toString() }]);
      setInput(result.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const addToMemory = () => {
    if (memory !== null && !isNaN(memory)) {
      setMemory(prevMemory => prevMemory + parseFloat(input));
    } else {
      setMemory(parseFloat(input));
    }
  };

  const subtractFromMemory = () => {
    if (memory !== null && !isNaN(memory)) {
      setMemory(prevMemory => prevMemory - parseFloat(input));
    } else {
      setMemory(-parseFloat(input));
    }
  };

  const recallMemory = () => {
    if (memory !== null) {
      setInput(memory.toString());
    }
  };

  const clearMemory = () => {
    setMemory(null);
  };

  const saveToMemory = () => {
    setMemory(parseFloat(input));
  };

  const handleButtonClick = (value) => {
    switch (value) {
      case 'C':
        setInput('');
        break;
      case 'BS':
        setInput(input.slice(0, -1));
        break;
      case '.':
        setInput(input + '.');
        break;
      case '=':
        calculateResult(input);
        break;
      case 'M+':
        addToMemory();
        break;
      case 'M-':
        subtractFromMemory();
        break;
      case 'MR':
        recallMemory();
        break;
      case 'MC':
        clearMemory();
        break;
      case 'MS':
        saveToMemory();
        break;
      default:
        setInput((preValue) => preValue + value);
    }
  };

  return (
    <>
      <div className='container'>
        <div className='calc'>
          <h1 id='input'>{input}</h1>
          <div>
            <button onClick={() => handleButtonClick('MC')}>MC</button>
            <button onClick={() => handleButtonClick('C')}>C</button>
            <button onClick={() => handleButtonClick('BS')}>BS</button>
            <button onClick={() => handleButtonClick('%')}>%</button>
            <button onClick={() => handleButtonClick('/')}>/</button>
          </div>
          <div>
            <button onClick={() => handleButtonClick('M+')}>M+</button>
            <button onClick={() => handleButtonClick('7')}>7</button>
            <button onClick={() => handleButtonClick('8')}>8</button>
            <button onClick={() => handleButtonClick('9')}>9</button>
            <button onClick={() => handleButtonClick('*')}>*</button>
          </div>
          <div>
            <button onClick={() => handleButtonClick('M-')}>M-</button>
            <button onClick={() => handleButtonClick('4')}>4</button>
            <button onClick={() => handleButtonClick('5')}>5</button>
            <button onClick={() => handleButtonClick('6')}>6</button>
            <button onClick={() => handleButtonClick('-')}>-</button>
          </div>
          <div>
            <button onClick={() => handleButtonClick('MR')}>MR</button>
            <button onClick={() => handleButtonClick('1')}>1</button>
            <button onClick={() => handleButtonClick('2')}>2</button>
            <button onClick={() => handleButtonClick('3')}>3</button>
            <button onClick={() => handleButtonClick('+')}>+</button>
          </div>
          <div>
            <button onClick={() => handleButtonClick('MS')}>MS</button>
            <button onClick={() => handleButtonClick('0')}>0</button>
            <button onClick={() => handleButtonClick('00')}>00</button>
            <button onClick={() => handleButtonClick('.')}>.</button>
            <button onClick={() => handleButtonClick('=')}>=</button>
          </div>
        </div>
        <div className="history">
          {history.map((item, index) => (
            <article key={index}>
              <p>{item.expression} = {item.result}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;