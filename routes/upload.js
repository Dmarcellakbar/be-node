const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const auth = require('../middlewares/authMiddleware');
const uploadController = require('../controllers/uploadController');

router.post('/', auth, upload.single('file'), uploadController.uploadFile);

module.exports = router;
