const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
	type: 'string',
	base: joi.string(),
	messages: {
		'string.escapeHTML': '{{#label}} must not include HTML!'
	},
	rules: {
		escapeHTML: {
			validate(value, helpers) {
				const clean = sanitizeHtml(value, {
					allowedTags: [],
					allowedAttributes: {}
				});
				if (clean !== value) return helpers.error('string.escapeHTML', { value });
				return clean;
			}
		}
	}
});

const Joi = BaseJoi.extend(extension);

module.exports.userSchema = Joi.object({
	username: Joi.string().min(5).max(20).required('Username Required').alphanum().escapeHTML(),
	password: Joi.string()
		.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/, 'valid password')
		.required('Password Required'),
	repeatPassword: Joi.ref('password'),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: [ 'com', 'net', 'ir' ] } })
		.required('Email Required')
		.escapeHTML(),
	name: Joi.string().escapeHTML()
});

module.exports.projectSchema = Joi.object({
	title: Joi.string().required('Poroject Required').escapeHTML(),
	description: Joi.string().required('Poroject Required').escapeHTML(),
	client: Joi.string().required('Client Required').escapeHTML(),
	state: Joi.string().required().escapeHTML(),
	city: Joi.string().required().escapeHTML(),
	year: Joi.number().required().integer(),
	employees: Joi.number().required(),
	images: Joi.array().items({ filename: Joi.string(), path: Joi.string() })
});

module.exports.projectEditSchema = Joi.object({
	title: Joi.string().required('Poroject Required').escapeHTML(),
	description: Joi.string().required('Poroject Required').escapeHTML(),
	client: Joi.string().required('Client Required').escapeHTML(),
	state: Joi.string().required().escapeHTML(),
	city: Joi.string().required().escapeHTML(),
	year: Joi.number().required().integer(),
	employees: Joi.number().required(),
	deleteImages: Joi.array().items(Joi.string()),
	images: Joi.array().items({ filename: Joi.string(), path: Joi.string() })
});

module.exports.postSchema = Joi.object({
	title: Joi.string().required().escapeHTML(),
	description: Joi.string().required(),
	image: Joi.object({ filename: Joi.string(), path: Joi.string() })
});

module.exports.reviewSchema = Joi.object({
	fullname: Joi.string().required().escapeHTML(),
	email: Joi.string().required().escapeHTML(),
	phone: Joi.string().required().escapeHTML(),
	description: Joi.string().required().escapeHTML()
});
