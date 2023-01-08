import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';

function NewGameButton() {
  const { user } = useAuth();
  const { startGame } = useGame();

  const handleClick = () => {
    startGame(user.id);
  };

  return (
    <button onClick={handleClick}>New Game</button>
  );
}

export default NewGameButton;
