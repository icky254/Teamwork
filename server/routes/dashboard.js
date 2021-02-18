const router = require('express').Router();
const pool = require('../models/db');

const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
   // res.json(req.user); // req.user holds the payload

    const user = await pool.query('SELECT first_name, nickname FROM users WHERE user_id = $1', [
      req.user
    ]);

    res.json(user.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error!');
  }
})

module.exports = router;
