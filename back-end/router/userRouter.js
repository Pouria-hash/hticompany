const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { validateUser, isLoggedIn } = require('../utils/middleware');
const wrapAsync = require('../utils/wrapAsync');

router.post(
	'/register',
	validateUser,
	wrapAsync(async (req, res, next) => {
		const { username, password, repeatPassword, email, name } = req.body;
		if (password !== repeatPassword) {
			throw new Error('repeat password not match');
		} else {
			const user = new User({ username, email, name });
			const regUser = await User.register(user, password);
			if (regUser) {
				req.login(regUser, (err) => {
					if (err) next(err);
					const { _id, username, email, isAdmin, name } = req.user;
					const userInfo = { _id, username, email, isAdmin, name };
					res.status(200).json({ userInfo, message: 'Welcome' });
				});
			} else {
				throw new Error('username or password is incorrect');
			}
		}
	})
);

router.post('/login', (req, res, next) => {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.json({ success: false, message: info.message });
		}
		req.logIn(user, (errLogin) => {
			if (errLogin) {
				return res.json({ success: false, message: errLogin });
			}
			const { _id, username, email, isAdmin, name } = req.user;
			const userInfo = { _id, username, email, isAdmin, name };
			return res.status(200).json({ userInfo, message: 'welcome back', success: true });
		});
	})(req, res, next);
});

router.post('/logout', (req, res) => {
	req.logOut();
	res.json({ success: true, message: 'Good bye' });
});

router.put('/profile', isLoggedIn, async (req, res) => {
	const { email, name, oldPassword, newPassword } = req.body;
	const username = req.user.username;

	const user = await User.findOne({ username });
	if (!oldPassword) {
		user.email = email;
		user.name = name;
		await user.save();

		res.json({
			success: true,
			message: 'email and/or name changed',
			userInfo: user
		});
	} else {
		user.email = email;
		user.name = name;
		user.changePassword(oldPassword, newPassword, (err) => {
			if (err) {
				if (err.name === 'IncorrectPasswordError') {
					res.status(500).json({ success: false, message: 'Incorrect Password' });
				} else {
					res
						.status(500)
						.json({ success: false, message: 'Something went wrong!! Please try again after sometimes.' });
				}
			} else {
				res.json({
					success: true,
					message: 'Your password has been changed successfully',
					userInfo: req.user
				});
			}
		});
	}
});

module.exports = router;
