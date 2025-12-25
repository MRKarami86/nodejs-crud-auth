require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('./app');

console.log('Starting server...');

const startServer = async () => {
  try {
    console.log('Creating in-memory MongoDB...');
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    console.log('MongoDB URI:', uri);

    await mongoose.connect(uri);
    console.log('DB Connected (in-memory)');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

startServer();
