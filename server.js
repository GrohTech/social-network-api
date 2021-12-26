// Import dependencies
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

// Set up Mongoose to connect to specified db when app is started
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Mongo query log
mongoose.set('debug', true);

// Server listening
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
