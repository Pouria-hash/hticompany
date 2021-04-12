const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		image: {
			filename: String,
			path: String
		},
		description: {
			type: String,
			required: true
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
