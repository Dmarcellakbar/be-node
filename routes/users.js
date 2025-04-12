const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');

const auth = require('../middlewares/authMiddleware');

router.post('/', user.create);
router.get('/', user.getAll);
router.put('/:id', user.update);
router.delete('/:id', user.remove);
router.put('/me', auth, user.updateMe);

module.exports = router;
