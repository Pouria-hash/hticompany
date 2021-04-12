import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Container, Button, Form } from 'react-bootstrap';
import { editProject, detailProject } from '../action/projectAction';
import { project_detail_reset, project_edit_reset } from '../constans/projectConstans';
import Message from '../component/Message';
import Loading from '../component/Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Meta from '../component/Meta';

const ProjectEditScreen = ({ history, match }) => {
	const dispatch = useDispatch();
	const [ title, setTitle ] = useState('');
	const [ images, setImages ] = useState([]);
	const [ existImages, setExistImages ] = useState([]);
	const [ state, setState ] = useState('');
	const [ city, setCity ] = useState('');
	const [ year, setYear ] = useState(2000);
	const [ employees, setEmployees ] = useState(1);
	const [ description, setDescription ] = useState('');
	const [ client, setClient ] = useState('');
	const [ deleteImages, setDeleteImages ] = useState([]);
	const [ uploading, setUploading ] = useState(false);
	const [ validateMessage, setValidateMessage ] = useState('');
	const [ errUploadingMessage, setErrUploadingMessage ] = useState('');

	const { id: projectId } = match.params;
	const projectDetail = useSelector((state) => state.projectDetail);
	const { project, error, loading } = projectDetail;
	const { userInfo } = useSelector((state) => state.userLogin);

	const projectEdit = useSelector((state) => state.projectEdit);
	const { error: editError, message, success, loading: editLoading } = projectEdit;

	useEffect(
		() => {
			if (!userInfo || !userInfo.isAdmin) {
				history.push('/login?redirect=admin/posts');
			} else if (success) {
				setTimeout(() => {
					dispatch({ type: project_edit_reset });
					localStorage.removeItem('images');
					dispatch({ type: project_detail_reset });
					history.push('/admin/projects');
				}, 5000);
			} else if (!project || !project.title || project._id !== projectId) {
				dispatch(detailProject(projectId));
			} else {
				setTitle(project.title);
				setExistImages(project.images);
				setCity(project.location.city);
				setState(project.location.state);
				setDescription(project.description);
				setYear(project.year);
				setEmployees(project.employees);
				setClient(project.client);
			}
		},
		[ dispatch, userInfo, projectId, success, history, project ]
	);

	const uploadFileHandler = async (e) => {
		const files = e.target.files;
		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('image', files[i]);
		}

		setUploading(true);
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};
			const { data } = await axios.post('/api/upload', formData, config);
			setImages(data);
			localStorage.setItem('images', JSON.stringify(images));
			setUploading(false);
			// previewFiles(images);
		} catch (error) {
			setErrUploadingMessage(error.message);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title || !state || !city || !description || !year || !employees || !client) {
			setValidateMessage('ورودی ها را تکمیل کنید');
		} else {
			if (localStorage.getItem('images')) {
				setImages(JSON.parse(localStorage.getItem('images')));
			}
			dispatch(
				editProject(projectId, {
					title,
					images,
					description,
					year,
					employees,
					deleteImages,
					state,
					city,
					client
				})
			);
		}
	};

	return loading ? (
		<div className="vh-100">
			<Loading />
		</div>
	) : error ? (
		<div className="vh-100 mt-5">
			<Message variant="danger" message={error} />
		</div>
	) : (
		<Container style={{ margin: '100px 0' }}>
			<Meta title="ویرایش پروژه - شرکت هدف توسعه ایرانیان" description="" />
			<Row>
				{editLoading && <Loading />}
				{editError && <Message variant="danger" message={error} />}
				{message && <Message variant={success ? 'success' : 'danger'} message={message} />}
				{validateMessage && <Message variant="danger" message={validateMessage} />}
				{errUploadingMessage && <Message variant="danger" message={errUploadingMessage} />}

				<Col md={8} className=" card p-5 mx-auto">
					<div className="d-flex flex-row justify-content-between">
						<div>
							<h1>ویرایش پروژه</h1>
						</div>
						<div>
							<Link to="/admin/projects" className="btn btn-dark">
								بازگشت
							</Link>
						</div>
					</div>

					<Form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="title" className="form-label">
								عنوان
							</label>
							<input
								type="text"
								placeholder="عنوان"
								className="form-control "
								onChange={(e) => setTitle(e.target.value)}
								id="title"
								value={title}
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="image" className="form-label">
								عکس
							</label>

							<input type="file" multiple className="form-control" onChange={uploadFileHandler} />
							{uploading && <Loading className="mt-3" />}
							<div className="d-flex flex-row flex-wrap">
								{images &&
									images.length > 0 &&
									images.map((image, index) => (
										<div key={index} className="me-1">
											<img
												src={image.path}
												alt="preview"
												className="img-fluid rounded mt-1 me-1"
												style={{ width: '100px', height: '100px', objectFit: 'cover' }}
											/>
										</div>
									))}
							</div>
						</div>
						<Row className="mb-3">
							<Col>
								<label htmlFor="state" className="form-label">
									استان
								</label>
								<input
									type="text"
									placeholder="استان"
									className="form-control "
									value={state}
									onChange={(e) => setState(e.target.value)}
									id="state"
									required
								/>
							</Col>
							<Col>
								<label htmlFor="city" className="form-label">
									شهر
								</label>
								<input
									type="text"
									placeholder="شهر"
									className="form-control "
									value={city}
									onChange={(e) => setCity(e.target.value)}
									id="city"
									required
								/>
							</Col>
						</Row>
						<div className="mb-3">
							<label htmlFor="client" className="form-label">
								کارفرما
							</label>
							<input
								type="text"
								placeholder="کارفرما"
								className="form-control "
								value={client}
								onChange={(e) => setClient(e.target.value)}
								id="client"
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="year" className="form-label">
								سال تکمیل پروژه
							</label>
							<input
								type="number"
								placeholder="سال تکمیل پروژه"
								className="form-control "
								value={year}
								onChange={(e) => setYear(e.target.value)}
								id="year"
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="employees" className="form-label">
								تعداد کارکنان
							</label>
							<input
								type="text"
								placeholder="تعداد کارکنان"
								className="form-control "
								value={employees}
								onChange={(e) => setEmployees(e.target.value)}
								id="employees"
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="description" className="form-label">
								توضیحات
							</label>
							<textarea
								placeholder="توضیحات"
								className="form-control "
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								id="description"
								required
							/>
						</div>
						<div className="d-flex flex-row flex-wrap">
							{existImages.map((image, index) => (
								<div key={index} className="me-1">
									<img
										src={image.path}
										alt="preview"
										className="img-fluid rounded mt-1 me-1"
										style={{ width: '100px', height: '100px', objectFit: 'cover' }}
									/>
									<div class="form-check">
										<input
											className="form-check-input"
											type="checkbox"
											value={deleteImages}
											onChange={(e) =>
												e.target.checked
													? setDeleteImages([ ...deleteImages, image.filename ])
													: setDeleteImages(
															deleteImages.filter((img) => img !== image.filename)
														)}
											id={`image${[ index ]}`}
										/>
										<label className="form-check-label" htmlFor={`image${[ index ]}`}>
											پاک کردن
										</label>
									</div>
								</div>
							))}
						</div>
						<div className="d-grid">
							<Button className="btn btn-primary" disabled={uploading ? true : false} type="submit">
								ایجاد
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default ProjectEditScreen;
