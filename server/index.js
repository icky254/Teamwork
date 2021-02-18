const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const index = require('./routes/jwtAuth');
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);

app.use('/api/auth', require('./routes/jwtAuth'));

// Dashboard Route
app.use('/api/dashboard', require('./routes/dashboard'));

app.listen(port, () => {
  console.log(`Connected to server on port: ${port}`);
});

module.exports = app;
