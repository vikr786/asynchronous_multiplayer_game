import React from 'react';
import { useCounter } from '../hooks/useCounter';

const ListItemAdder = () => {
  const { count, increment } = useCounter();
  const [items, setItems] = useState([]);

  const handleClick = () => {
    increment();
    setItems((prevItems) => [...prevItems, count]);
  };

  return (
    <div>
      <button onClick={handleClick}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListItemAdder;
