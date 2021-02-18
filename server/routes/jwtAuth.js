const router = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../models/db');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const auth = require('../middleware/auth');

// Registration

router.post('/register', validInfo, async (req, res) => {
  try {
    // 1. Destructure req.body (first_name, last_name, nickname, age, email, password)
    const {
      first_name,
      last_name,
      nickname, 
      age, 
      email, 
      password 
    } = req.body;

    // 2. Check if user exists (throw error is user exists)
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email
    ]);

    // res.json(user.rows);
    if (user.rows.length !== 0) {
      return res.status(401).json('User already exists');
    }

    // 3. Encrypt user's password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. Enter new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (first_name, last_name, nickname, age, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
      [first_name, last_name, nickname, age, email, bcryptPassword]
    );
    
    // 5. Generate jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({token});
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

// Login route

router.post('/login', validInfo, async (req, res) => {
  try {
    // 1. Destructure the req.body
    const { email, password } = req.body;
    
    // 2. Check if user doesn't exist. If not, throw error.

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json('Email or password is incorrect');
    }
    // 3. Check if incoming and database stored password match

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json('Email or password is incorrect');
    }
    // 4  Give them the JWT token

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/is-verify', auth, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error!');
  }
})

module.exports = router;
