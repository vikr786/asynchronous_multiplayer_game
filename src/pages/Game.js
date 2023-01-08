import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Game = () => {
  const [game, setGame] = useState({});
  const [error, setError] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [winner, setWinner] = useState('');
  const [board, setBoard] = useState(Array(9).fill(''));
  const [gameOver, setGameOver] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get(`/api/games/${id}`);
        setGame(res.data);
        setBoard(res.data.board);
        setCurrentPlayer(res.data.currentPlayer);
        setWinner(res.data.winner);
        setGameOver(res.data.gameOver);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchGame();
  }, [id]);

  const handleMove = async (index) => {
    try {
      const res = await axios.patch(`/api/games/${id}`, { move: index });
      setGame(res.data);
      setBoard(res.data.board);
      setCurrentPlayer(res.data.currentPlayer);
      setWinner(res.data.winner);
      setGameOver(res.data.gameOver);
    } catch (error) {
      setError(error.message);
    }
  };

  const renderBoard = () => {
    return board.map((cell, index) => (
      <div
        key={index}
        className="cell"
        onClick={() => !gameOver && handleMove(index)}
      >
        {cell}
      </div>
    ));
  };

  return (
    <div className="game-container">
      {error && <div className="error">{error}</div>}
      <div className="board">{renderBoard()}</div>
      {gameOver && (
        <div className="game-over">
          {winner ? `${winner} won!` : 'It\'s a draw!'}
        </div>
      )}
    </div>
  );
};

export default Game;
