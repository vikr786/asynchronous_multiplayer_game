import React from 'react';
import { useGame } from '../components/hooks/useGame';

const GameCard = ({ game }) => {
  const { updateGame } = useGame();

  const handlePlayAgain = () => {
    updateGame({ ...game, status: 'waiting' });
  };

  return (
    <div className="game-card">
      <div className="game-result">
        {game.status === 'won' ? 'You won!' : 'You lost :('}
      </div>
      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
};

export default GameCard;
