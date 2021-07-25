import React, {useState} from 'react';
import './Counter.css';

function Counter(): React.ReactElement {
  const [counterValue, setCounterValue] = useState(0);
  const [inputValue, setInputValue] = useState(1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(parseInt(event.target.value));

  const handleSubtractButton = () => setCounterValue(counterValue - inputValue);
  const handleAddButton = () => setCounterValue(counterValue + inputValue);
  const counterColor =
    (counterValue >= 100 ? 'green' : '') || (counterValue <= -100 ? 'red' : '');

  return (
    <div>
      <h1 data-testid="header">My Counter</h1>
      <h2 data-testid="counter" className={counterColor}>
        {counterValue}
      </h2>
      <button data-testid="sub-btn" onClick={handleSubtractButton}>
        -
      </button>
      <input
        className="text-center"
        data-testid="input"
        onChange={handleInputChange}
        type="number"
        value={inputValue}
      />
      <button data-testid="add-btn" onClick={handleAddButton}>
        +
      </button>
    </div>
  );
}

export default Counter;
