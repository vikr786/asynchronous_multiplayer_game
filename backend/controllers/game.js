const Game = require('../models/game');
const User = require('../models/user');

async function startGame(req, res) {
  try {
    const { opponentEmail } = req.body;
    const { userId } = req.user;

    // Check if user with given email exists
    const opponent = await User.findOne({ email: opponentEmail });
    if (!opponent) {
      return res.status(400).send({ error: 'Invalid opponent email' });
    }

    // Check if game between these two users already exists
    const gameExists = await Game.findOne({
      $and: [{ players: { $in: [userId] } }, { players: { $in: [opponent._id] } }]
    });
    if (gameExists) {
      return res.status(400).send({ error: 'Game between these users already exists' });
    }

    // Create new game
    const game = new Game({ players: [userId, opponent._id] });
    await game.save();

    return res.send({ game });
  } catch (error) {
    return res.status(500).send({ error: 'Error starting game' });
  }
}

async function playGame(req, res) {
  try {
    const { gameId, position } = req.body;
    const { userId } = req.user;

    // Find game and check if it's the current player's turn
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(400).send({ error: 'Invalid game id' });
    }
    if (game.currentPlayer !== userId) {
      return res.status(400).send({ error: "It's not your turn" });
    }

    // Update game state
    game.board[position] = game.currentPlayer === game.players[0] ? 'X' : 'O';
    game.currentPlayer = game.currentPlayer === game.players[0] ? game.players[1] : game.players[0];
    game.lastUpdated = Date.now();

    // Check if game is finished
    const winner = checkForWinner(game.board);
    if (winner) {
      game.winner = winner;
      game.finished = true;
    } else if (game.board.every(cell => cell !== null)) {
      game.finished = true;
    }

    await game.save();

    return res.send({ game });
  } catch (error) {
    return res.status(500).send({ error: 'Error playing game' });
  }
}

module.exports = {
  startGame,
  playGame
};

function checkForWinner(board) {
    const lines = [    [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }
  