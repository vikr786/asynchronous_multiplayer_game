import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');
  const [newGameEmail, setNewGameEmail] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get('/api/games');
        setGames(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchGames();
  }, []);

  const handleNewGameSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('/api/games', { email: newGameEmail });
      setGames([...games, res.data]);
      setNewGameEmail('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="home-container">
      {error && <div className="error">{error}</div>}
      {games.length > 0 ? (
        <div className="games-list">
          {games.map((game) => (
            <div key={game.id} className="game-item">
              <Link to={`/games/${game.id}`}>Game #{game.id}</Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-games">You have no ongoing games.</div>
      )}
      <form onSubmit={handleNewGameSubmit}>
        <label htmlFor="new-game-email">
          Invite a friend to play:
          <input
            type="email"
            id="new-game-email"
            value={newGameEmail}
            onChange={(event) => setNewGameEmail(event.target.value)}
            required
          />
        </label>
        <button type="submit">Create New Game</button>
      </form>
    </div>
  );
};

export default Home;
