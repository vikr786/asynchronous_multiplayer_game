import React, { useState } from 'react';
import { useGame } from '../components/hooks/useGame';
import { CELL_SIZE, BOARD_SIZE } from '../utils/constants';

const GameBoard = () => {
  const { game, updateGame } = useGame();
  const [board, setBoard] = useState(game.board);

  const handleClick = (index) => {
    // Update the board state and the game in the context
  };

  return (
    <div className="game-board" style={{ width: BOARD_SIZE, height: BOARD_SIZE }}>
      {board.map((cell, index) => (
        <div
          key={index}
          className="game-cell"
          style={{ width: CELL_SIZE, height: CELL_SIZE }}
          onClick={() => handleClick(index)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
