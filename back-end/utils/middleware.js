const { userSchema, projectSchema, postSchema, projectEditSchema } = require('./schemaValid');

module.exports.validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message);
		throw new Error(msg);
	} else {
		next();
	}
};

module.exports.validateProject = (req, res, next) => {
	const { error } = projectSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message);
		throw new Error(msg);
	} else {
		next();
	}
};

module.exports.validateEditProject = (req, res, next) => {
	const { error } = projectEditSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message);
		throw new Error(msg);
	} else {
		next();
	}
};

module.exports.validatePost = (req, res, next) => {
	const { error } = postSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message);
		throw new Error(msg);
	} else {
		next();
	}
};

module.exports.validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message);
		throw new Error(msg);
	} else {
		next();
	}
};

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		throw new Error('شما باید وارد شوید.');
	}
	next();
};

module.exports.isAdmin = (req, res, next) => {
	if (!req.user.isAdmin) {
		throw new Error('شما باید ادمین باشید.');
	}
	next();
};
