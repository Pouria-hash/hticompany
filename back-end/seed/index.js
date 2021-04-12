const mongoose = require('mongoose');
const Project = require('../models/project');

mongoose
	.connect('mongodb://localhost:27017/HT-Company', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log('mongosoe connection open');
	})
	.catch((e) => {
		console.log('mongoose connection error', e);
	});

const seedDb = async () => {
	await Project.deleteMany({});
	const project = await Project.insertMany([
		{
			title: 'Saghand Iron Ore Concentrate',
			image:
				'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffstco.com%2Fprojects%2Fgroup%2Fdetail%2F%25DA%25A9%25D8%25A7%25D8%25B1%25D8%25AE%25D8%25A7%25D9%2586%25D9%2587-%25DA%25A9%25D9%2586%25D8%25B3%25D8%25A7%25D9%2586%25D8%25AA%25D8%25B1%25D9%2587-%25D8%25B3%25D9%2586%25DA%25AF-%25D8%25A2%25D9%2587%25D9%2586-%25D9%25BE%25D8%25A7%25DB%258C%25D8%25A7-%25D9%2581%25D9%2588%25D9%2584%25D8%25A7%25D8%25AF%2F72%2Fview%2F&psig=AOvVaw2S74E38yKweSAfyVYQIk-I&ust=1615973579664000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMC-3uzAtO8CFQAAAAAdAAAAABAD',
			location: { state: 'Yazd', city: 'Saghand' },
			year: '2019',
			employees: 200,
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam provident asperiores et, delectus repudiandae aperiam illum necessitatibus omnis totam hic sapiente quas minima nisi maiores id ratione quae cumque iste.',
			user: '604fac9f15054d099bab27ca',
			client: 'Foulad Paya'
		}
	]);
	console.log(project);
};

seedDb();
