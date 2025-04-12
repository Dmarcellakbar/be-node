const pool = require('../db');
const path = require('path');

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const { id: userId } = req.user;

    const result = await pool.query(
      `INSERT INTO files (file_name, file_type, file_size, file_path, uploaded_by, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING *`,
      [
        file.originalname,
        file.mimetype,
        file.size,
        file.path,
        userId
      ]
    );

    res.status(201).json({ message: 'File uploaded successfully', file: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
