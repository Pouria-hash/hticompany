const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const Post = require('../models/blog');
const { isLoggedIn, isAdmin, validatePost } = require('../utils/middleware');
const cloudinary = require('cloudinary').v2;

router.get(
	'/',
	wrapAsync(async (req, res) => {
		const posts = await Post.find({}).sort({ createdAt: -1 }).populate('user');
		if (posts) {
			res.status(200).json(posts);
		} else {
			throw new Error('پست پیدا نشد.');
		}
	})
);

router.get(
	'/home',
	wrapAsync(async (req, res) => {
		const posts = await Post.find({}).sort({ createdAt: -1 }).limit(3).populate('user');
		if (posts && posts.length > 0) {
			res.status(200).json(posts);
		} else {
			throw new Error('پست پیدا نشد.');
		}
	})
);

router.post(
	'/',
	isLoggedIn,
	isAdmin,
	validatePost,
	wrapAsync(async (req, res) => {
		const { title, description, image } = req.body;
		const newPost = new Post({ title, description, image });
		newPost.user = req.user._id;
		await newPost.save();
		res.status(200).json({ success: true, message: 'پست جدید با موفقیت ایجاد شد.' });
	})
);

router.get(
	'/post/:id',
	wrapAsync(async (req, res) => {
		const post = await Post.findById(req.params.id);
		if (post) {
			res.status(200).json(post);
		} else {
			throw new Error('Post not found');
		}
	})
);

router.put(
	'/post/:id',
	isLoggedIn,
	isAdmin,
	validatePost,
	wrapAsync(async (req, res) => {
		const { title, image, description } = req.body;
		const post = await Post.findById(req.params.id);
		if (image && image.filename) {
			await cloudinary.uploader.destroy(post.image.filename);
		}
		if (post) {
			post.title = title;
			post.image = image;
			post.description = description;
			await post.save();
			res.status(200).json({ success: true, message: 'پست آپدید شد.' });
		} else {
			res.status(404);
			throw new Error('پست پیدا نشد.');
		}
	})
);

router.delete(
	'/post/:id',
	isLoggedIn,
	isAdmin,
	wrapAsync(async (req, res) => {
		const { id } = req.params;
		const post = await Post.findById(id);
		if (post) {
			await cloudinary.uploader.destroy(post.image.filename);
			await Post.findByIdAndDelete(id);

			res.status(200).json({ message: 'پست مورد نظر با موفقیت پاک شد.', success: true });
		} else {
			throw new Error('پست پیدا نشد.');
		}
	})
);

module.exports = router;
