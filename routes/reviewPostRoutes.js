// const express = require('express');
// const router = express.Router();
// const reviewController = require('../controllers/reviewPostController');
// const authMiddleware = require('../middlewares/authMiddleware'); // Assuming you have auth middleware

// // Apply authentication middleware to all routes
// router.use(authMiddleware);

// // Like or comment on a post
// router.post('/:post_id', reviewController.likeOrCommentPost);

// // Get all reviews for a post
// router.get('/post/:post_id', reviewController.getPostReviews);

// // Get like count for a post
// router.get('/post/:post_id/likes', reviewController.getLikeCount);

// // Update a review
// router.put('/:id', reviewController.updateReview);

// // Delete a review
// router.delete('/:id', reviewController.deleteReview);

// module.exports = router;