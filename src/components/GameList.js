import React from 'react';
import { useAuth } from './hooks/useAuth';
import GameCard from './GameCard';

const GameList = () => {
  const { games } = useAuth();

  return (
    <div className="game-list">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
