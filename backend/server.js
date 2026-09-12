const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const studentRoutes = require('./routes/studentRoutes');
const healthRoutes = require('./routes/healthRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/students', studentRoutes);

const startServer = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
	} catch (error) {
		console.error('MongoDB connection failed:', error.message);
		process.exit(1);
	}
};

startServer();
