import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const startGame = async (opponentEmail) => {
  try {
    // Make a POST request to the backend to start a new game
    const res = await fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ opponentEmail }),
    });
    const data = await res.json();
    // If the game was successfully created, redirect the user to the game page
    if (res.status === 201) {
      history.push(`/games/${data.game._id}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export default startGame;
