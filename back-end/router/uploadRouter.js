const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../utils/middleware');
const multer = require('multer');
const storage = require('../cloudinary/config');

const upload = multer({ storage });

router.post('/api/upload', upload.array('image'), isLoggedIn, isAdmin, (req, res) => {
	const images = req.files.map((f) => ({ path: f.path, filename: f.filename }));

	res.send(images);
});

module.exports = router;
