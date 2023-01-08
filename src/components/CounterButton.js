import React from 'react';
import { useCounter } from '../hooks/useCounter';

const CounterButton = () => {
  const { count, increment } = useCounter();

  return (
    <button onClick={increment}>
      You have clicked this button {count} times
    </button>
  );
};

export default CounterButton;
