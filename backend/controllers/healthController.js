const getHealth = (req, res) => {
  res.json({ message: 'Backend is running' });
};

module.exports = { getHealth };
