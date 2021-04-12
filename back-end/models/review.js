const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		phone: {
			type: Number,
			required: true
		},
		description: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
