const express = require('express');
const router = express.Router();
const category = require('../controllers/categoryController');

router.post('/', category.create);
router.get('/', category.getAll);
router.put('/:id', category.update);
router.delete('/:id', category.remove);

module.exports = router;
