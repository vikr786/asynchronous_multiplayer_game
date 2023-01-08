import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';

function GameMenu() {
  const { user } = useAuth();
  const { game, resignGame, finishGame } = useGame();

  if (!game) {
    return null;
  }

  let menu;
  if (game.status === 'waiting') {
    menu = (
      <div>
        <p>Waiting for other player to make their move...</p>
        <button onClick={resignGame}>Resign</button>
      </div>
    );
  } else if (game.status === 'your_turn') {
    menu = <p>It's your turn!</p>;
  } else if (game.status === 'finished') {
    let message;
    if (game.winner === user.id) {
      message = 'You won!';
    } else if (game.winner) {
      message = 'You lost!';
    } else {
      message = 'The game was a draw.';
    }
    menu = (
      <div>
        <p>{message}</p>
        <button onClick={finishGame}>Finish</button>
      </div>
    );
  }

  return menu;
}

export default GameMenu;
