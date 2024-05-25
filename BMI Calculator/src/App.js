import React, { useState, useMemo } from 'react'
import './App.css'

const App = () => {
  const [weight, setWeight] = useState(50);
  const [height, setHeight] = useState(160);

  function onWeightChange(e) {
    setWeight(e.target.value);
  }

  function onHeightChange(e) {
    setHeight(e.target.value);
  }

  const output = useMemo(() => {
    return (weight / ((height / 100) * (height / 100))).toFixed(2)
  }, [weight, height]);

  return (
    <main>
      <h1>BMI Calculator</h1>
      <div className='input-section'>
        <p className='slider-output'> Weight: {weight} kg</p>
        <input className='input-slider' type='range' step='1' min='40' max='200' onChange={onWeightChange}></input>
        <p className='slider-output'> Height: {height} cm</p>
        <input className='input-slider' type='range' min='140' max='200' onChange={onHeightChange} ></input>
      </div>
      <div className='output-section'>
        <p className='output'>Your BMI: {output}</p>
      </div>
    </main>
  )
}

export default App