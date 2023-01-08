const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { connectDb } = require('./utils/db');
const { errorHandler } = require('./utils/error');
const authRouter = require('./routes/auth');
const gameRouter = require('./routes/game');
const userRouter = require('./routes/user');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse request body as JSON
app.use(express.json());

// Mount routers
app.use('/api/auth', authRouter);
app.use('/api/game', gameRouter);
app.use('/api/user', userRouter);

// Error handling middleware
app.use(errorHandler);

// Connect to database and start server
//replace from here 
connectDb()
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
// to this if u are using MongoDB Atlas

/*
module.exports.connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
*/