const pool = require('../models/db');

const user_index = (req, res) => {
  res.json({
    message: 'Karibu'
  });
};

const user_details = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query(
      'SELECT * FROM users WHERE user_id=$1',
      [id]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const user_delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query(
      'DELETE FROM users WHERE user_id = $1', 
      [id]
    );
    res.json('Deleted successfully!');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  user_index,
  user_details,
  user_delete
};
