const pool = require('../db');

exports.create = async (req, res) => {
  const { code, name, description, post_category_id, post_by, image_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO tr_post (code, name, description, post_category_id, post_by, image_id) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [code, name, description, post_category_id, post_by, image_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT 
          tr_post.*,
          users.id AS user_id,
          users.first_name AS user_first_name,
          users.last_name AS user_last_name,
          users.email AS user_email,
          users.address AS user_address,
          users.phone AS user_phone,
          md_post_category.id AS category_id,
          md_post_category.name AS category_name,
          files.id AS image_id,
          files.file_name AS image_file_name,
          files.file_type AS image_file_type,
          files.file_path AS image_file_path
        FROM tr_post
        JOIN users ON users.id = tr_post.post_by
        JOIN md_post_category ON md_post_category.id = tr_post.post_category_id
        LEFT JOIN files ON files.id = tr_post.image_id
        ORDER BY tr_post.updated_at DESC
      `);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  

exports.update = async (req, res) => {
  const { id } = req.params;
  const { code, name, description, post_category_id, post_by, image_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE tr_post SET code=$1, name=$2, description=$3 ,post_category_id=$4, post_by=$5, image_id=$6, updated_at=NOW() 
       WHERE id=$7 RETURNING *`,
      [code, name, description, post_category_id, post_by, image_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM tr_post WHERE id=$1`, [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
