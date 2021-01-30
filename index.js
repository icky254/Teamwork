const express = require('express');

const app = express();
const cors = require('cors');
const pool = require('./db');

const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// Routes

// Create a user
app.post('/users', async (req, res) => {
  try {
    const { 
      full_name,
      nickname, 
      age, 
      email 
    } = req.body;
    const newUser = await pool.query(
      'INSERT INTO users (full_name, nickname, age, email) VALUES ($1, $2, $3, $4)',
      [full_name, nickname, age, email]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// get all users
app.get('/users', async (req, res) => {
  try {
    const allUsers = await pool.query('SELECT * FROM users');
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a single user
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM users where users = $1', [id]);

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a user
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name } = req.body;
    const updateUser = await pool.query(
      'UPDATE users SET full_name = $1 WHERE user_id = $2',
      [full_name, id]
    );

    res.json('User details updated succcessfully!');
  } catch (err) {
    console.error(err.message);
  }
});

// delete a user
app.delete('users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      'DELETE FROM users WHERE user_id = $1', 
      [id]
    );
    res.json('Deleted successfully!');
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Connected to server on port: ${port}`);
});
