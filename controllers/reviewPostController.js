// const pool = require('../db');

// // Like or comment on a post
// exports.likeOrCommentPost = async (req, res) => {
//   const { post_id } = req.params;
//   const { like_post, comment_post } = req.body;

//   try {
//     // Check if review already exists for this user/post combination
//     const existingReview = await pool.query(
//       `SELECT * FROM tr_review_post 
//        WHERE post_id = $1 AND user_id = $2`,
//       [post_id, req.user.id] // Assuming you have user authentication
//     );

//     if (existingReview.rows.length > 0) {
//       return res.status(400).json({ error: 'You have already reviewed this post' });
//     }

//     const result = await pool.query(
//       `INSERT INTO tr_review_post 
//        (post_id, user_id, like_post, comment_post, created_at, updated_at)
//        VALUES ($1, $2, $3, $4, NOW(), NOW())
//        RETURNING *`,
//       [post_id, req.user.id, like_post, comment_post]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all reviews for a post
// exports.getPostReviews = async (req, res) => {
//   const { post_id } = req.params;

//   try {
//     const result = await pool.query(
//       `SELECT r.*, u.username, u.avatar 
//        FROM tr_review_post r
//        JOIN users u ON r.user_id = u.id
//        WHERE post_id = $1 
//        ORDER BY created_at DESC`,
//       [post_id]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update a review
// exports.updateReview = async (req, res) => {
//   const { id } = req.params;
//   const { like_post, comment_post } = req.body;

//   try {
//     // Verify the review belongs to the user
//     const review = await pool.query(
//       `SELECT * FROM tr_review_post WHERE id = $1 AND user_id = $2`,
//       [id, req.user.id]
//     );

//     if (review.rows.length === 0) {
//       return res.status(404).json({ error: 'Review not found or unauthorized' });
//     }

//     const result = await pool.query(
//       `UPDATE tr_review_post 
//        SET like_post = $1, comment_post = $2, updated_at = NOW()
//        WHERE id = $3
//        RETURNING *`,
//       [like_post, comment_post, id]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete a review
// exports.deleteReview = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Verify the review belongs to the user
//     const review = await pool.query(
//       `SELECT * FROM tr_review_post WHERE id = $1 AND user_id = $2`,
//       [id, req.user.id]
//     );

//     if (review.rows.length === 0) {
//       return res.status(404).json({ error: 'Review not found or unauthorized' });
//     }

//     await pool.query(`DELETE FROM tr_review_post WHERE id = $1`, [id]);
//     res.json({ message: 'Review deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get like count for a post
// exports.getLikeCount = async (req, res) => {
//   const { post_id } = req.params;

//   try {
//     const result = await pool.query(
//       `SELECT COUNT(*) as like_count 
//        FROM tr_review_post 
//        WHERE post_id = $1 AND like_post = true`,
//       [post_id]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };