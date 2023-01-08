module.exports = {
    handleError: (err, res) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      } else if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).json({ message: err.message });
      }
      return res.status(500).json({ message: 'An internal server error occurred' });
    }
  };
  