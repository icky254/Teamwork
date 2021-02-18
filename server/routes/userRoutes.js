const express = require('express');
const pool = require('../models/db');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.user_index);

// Create a user
router.post('/users', async (req, res) => {
  try {
    const { 
      first_name,
      last_name,
      nickname, 
      age, 
      email 
    } = req.body;
    const newUser = await pool.query(
      'INSERT INTO users (full_name, nickname, age, email) VALUES ($1, $2, $3, $4)',
      [first_name, last_name, nickname, age, email]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/login', (req, res) => {
  jwt.sign();
});

// get all users
router.get('/users', async (req, res) => {
  try {
    const allUsers = await pool.query(
      'SELECT * FROM users'
    );
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a single user
router.get('/users/:id', userController.user_details);

// update a user
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params; // WHERE
    const { full_name } = req.body; // SET

    const updateUser = await pool.query(
      'UPDATE users SET full_name = $1 WHERE user_id = $2',
      [full_name, id]
    );

    res.json('Details updated successfully');
  } catch (err) {
    console.error(err);
  }
});

// delete a user
router.delete('/users/:id', userController.user_delete);

module.exports = router;
