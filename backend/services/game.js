const Game = require('../models/game');

const createGame = async (user1, user2) => {
  try {
    const game = new Game({
      player1: user1,
      player2: user2,
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      turn: user1,
      winner: null
    });
    await game.save();
    return game;
  } catch (error) {
    throw error;
  }
};

const getGame = async (gameId) => {
  try {
    const game = await Game.findById(gameId).lean();
    return game;
  } catch (error) {
    throw error;
  }
};

const updateGame = async (gameId, updatedGame) => {
  try {
    const updated = await Game.findByIdAndUpdate(gameId, updatedGame, { new: true });
    return updated;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createGame,
  getGame,
  updateGame
};
