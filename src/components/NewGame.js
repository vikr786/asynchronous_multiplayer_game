import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';

const NewGame = () => {
  const { startGame } = useGame();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    startGame(email)
      .then(() => {
        // Navigate to home page
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={handleChange} />
      </label>
      <button type="submit">Start Game</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default NewGame;
