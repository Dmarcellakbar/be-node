const express = require('express');
const router = express.Router();
const post = require('../controllers/postController');

router.post('/', post.create);
router.get('/', post.getAll);
router.put('/:id', post.update);
router.delete('/:id', post.remove);

module.exports = router;
