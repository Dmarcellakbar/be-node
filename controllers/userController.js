const pool = require('../db');
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
  const { email, password, first_name, last_name, address, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (email, password, first_name, last_name, address, phone) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [email, hashedPassword, first_name, last_name, address, phone]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query(`SELECT id, email, first_name, last_name, address, phone, created_at, updated_at FROM users`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { email, first_name, last_name, address, phone } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET email=$1, first_name=$2, last_name=$3, address=$4, phone=$5, updated_at=NOW()
       WHERE id=$6 RETURNING *`,
      [email, first_name, last_name, address, phone, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  exports.updateMe = async (req, res) => {
    const { email, password, first_name, last_name, address, phone } = req.body;
    const { id } = req.user;
  
    try {
      let query = `
        UPDATE users 
        SET email = $1, first_name = $2, last_name = $3, address = $4, phone = $5,
            updated_at = NOW()
      `;
      const values = [email, first_name, last_name, address, phone];
  
      if (password) {
        query += `, password = $6 WHERE id = $7 RETURNING *`;
        values.push(password, id);
      } else {
        query += ` WHERE id = $6 RETURNING *`;
        values.push(id);
      }
  
      const result = await pool.query(query, values);
  
      res.json({
        message: 'Profile updated successfully',
        user: {
          id: result.rows[0].id,
          email: result.rows[0].email,
          first_name: result.rows[0].first_name,
          last_name: result.rows[0].last_name,
          address: result.rows[0].address,
          phone: result.rows[0].phone,
          updated_at: result.rows[0].updated_at,
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update profile', error: err.message });
    }
  };