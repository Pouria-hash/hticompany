const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},

		images: [
			{
				path: String,
				filename: String
			}
		],
		description: {
			type: String,
			required: true
		},
		client: {
			type: String,
			required: true
		},
		location: {
			state: {
				type: String,
				required: true
			},
			city: {
				type: String,
				required: true
			}
		},
		year: {
			type: Number,
			required: true
		},
		employees: {
			type: Number
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

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
