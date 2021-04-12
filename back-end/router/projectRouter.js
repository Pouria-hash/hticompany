const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const { isLoggedIn, isAdmin, validateProject, validateEditProject } = require('../utils/middleware');
const wrapAsync = require('../utils/wrapAsync');
const cloudinary = require('cloudinary').v2;

router.get(
	'/',
	wrapAsync(async (req, res) => {
		const projects = await Project.find({});
		res.status(200).json(projects);
	})
);

router.post(
	'/new',
	isLoggedIn,
	isAdmin,
	validateProject,
	wrapAsync(async (req, res) => {
		const { title, images, description, year, employees, state, city, client } = req.body;
		const project = new Project({ title, images, description, year, employees, client, location: { state, city } });
		project.user = req.user._id;
		await project.save();
		res.status(200).json({ success: true, message: 'پروژه با موفقیت ایجاد شد.' });
	})
);

router.get(
	'/:id',
	wrapAsync(async (req, res) => {
		const { id } = req.params;
		const project = await Project.findById(id);
		if (project) {
			res.status(200).json(project);
		} else {
			throw new Error('پروژه پیدا نشد.');
		}
	})
);

router.put(
	'/:id',
	isLoggedIn,
	isAdmin,
	validateEditProject,
	wrapAsync(async (req, res) => {
		const { id } = req.params;
		const project = await Project.findById(id);
		if (project) {
			const { title, images, description, year, employees, state, city, client, deleteImages } = req.body;
			const updatedProject = await Project.findByIdAndUpdate(id, {
				title,
				description,
				year,
				employees,
				location: { state, city },
				client
			});
			updatedProject.images.push(...images);
			await updatedProject.save();
			if (deleteImages) {
				for (let filename of deleteImages) {
					console.log(filename);
					await cloudinary.uploader.destroy(filename);
				}
				await updatedProject.updateOne({ $pull: { images: { filename: { $in: deleteImages } } } });
			}
			res.status(200).json({ success: true, message: 'پروژه با موفقیت آپدیت شد' });
		} else {
			throw new Error('پروژه پیدا نشد.');
		}
	})
);

router.delete(
	'/:id',
	isLoggedIn,
	isAdmin,
	wrapAsync(async (req, res) => {
		const { id } = req.params;
		const project = await Project.findById(id);
		if (project) {
			for (let image of project.images) {
				await cloudinary.uploader.destroy(image.filename);
			}
			const project = await Project.findByIdAndDelete(id);
			res.status(200).json({ success: true, message: 'پروژه با موفقیت پاک شد.' });
		} else {
			throw new Error('پروژه پیدا نشد.');
		}
	})
);

module.exports = router;
