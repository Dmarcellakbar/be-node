const pool = require('../db');

exports.create = async (req, res) => {
  const { code, name, level } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO md_post_category (code, name, level) VALUES ($1, $2, $3) RETURNING *`,
      [code, name, level]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT * FROM md_post_category
        ORDER BY updated_at DESC
      `);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

exports.update = async (req, res) => {
  const { id } = req.params;
  const { code, name, level } = req.body;
  try {
    const result = await pool.query(
      `UPDATE md_post_category SET code=$1, name=$2, level=$3, updated_at=NOW() WHERE id=$4 RETURNING *`,
      [code, name, level, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM md_post_category WHERE id=$1`, [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
