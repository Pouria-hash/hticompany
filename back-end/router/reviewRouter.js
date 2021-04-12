const express = require('express');
const { isLoggedIn, isAdmin, validateReview } = require('../utils/middleware');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const Review = require('../models/review');

router.get(
	'/',
	isLoggedIn,
	isAdmin,
	wrapAsync(async (req, res) => {
		const reviews = await Review.find({}).sort({ createdAt: -1 });
		res.status(200).json(reviews);
	})
);

router.post(
	'/',
	validateReview,
	wrapAsync(async (req, res) => {
		const review = new Review(req.body);
		await review.save();
		res.status(200).json({ message: 'درخواست شما برای ما ارسال شد', success: true });
	})
);

module.exports = router;
