import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Message from '../component/Message';
import Loading from '../component/Loading';
import { createNewPost } from '../action/blogAction';
import { post_create_reset } from '../constans/blogConstans';
import '@ckeditor/ckeditor5-build-classic/build/translations/fa.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Meta from '../component/Meta';

const PostCreateNewScreen = ({ history }) => {
	const [ description, setDescription ] = useState('');
	const [ title, setTitle ] = useState('');
	const [ image, setImage ] = useState('');
	const [ message, setMessage ] = useState('');
	const [ uploading, setUploading ] = useState(false);

	const dispatch = useDispatch();

	const postCreate = useSelector((state) => state.postCreate);
	const { loading, error, message: createMessage, success } = postCreate;
	const { userInfo } = useSelector((state) => state.userLogin);
	useEffect(
		() => {
			if (!userInfo || !userInfo.isAdmin) {
				history.push('/login?redirect=admin/posts');
			} else if (success) {
				setTimeout(() => {
					dispatch({ type: post_create_reset });
					localStorage.removeItem('postCreateImage');
					history.push('/admin/posts');
				}, 3000);
			} else if (localStorage.getItem('postImage')) {
				setImage(JSON.parse(localStorage.getItem('postCreateImage')));
			}
		},
		[ success, history, dispatch, userInfo ]
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title || !image || !description) {
			setMessage('قسمت های خالی را تکمیل کنید.');
		} else {
			dispatch(createNewPost({ title, image, description }));
		}
	};

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};
			const { data } = await axios.post('/api/upload', formData, config);
			setImage(data[0]);
			localStorage.setItem('postCreateImage', JSON.stringify(data[0]));
			setUploading(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container className="my-5 pt-5">
			<Meta title="ایجاد پست جدید - شرکت هدف توسعه ایرانیان" description="" />
			<Row>
				{message && <Message variant="danger" message={message} />}
				{loading && <Loading />}
				{error && <Message variant="danger" message={error} />}
				{createMessage && <Message variant="success" message={createMessage} />}
				<Col md={8} lg={6} className="offset-md-2 offset-lg-3 card shadow p-4 mx-auto">
					<div className="d-flex flex-row justify-content-between ">
						<div>
							<h1>ایجاد پست جدید</h1>
						</div>
						<div>
							<Link to="/admin/posts" className="btn btn-dark">
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
								value={title}
								className="form-control"
								placeholder="عنوان"
								required
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="image" className="form-label">
								عکس
							</label>
							<input type="file" className="form-control" onChange={uploadFileHandler} />
							{uploading && <Loading className="mt-3" />}
							{image && (
								<img
									src={image.path}
									className="img-fluid rounded mt-1"
									alt={image.filename}
									style={{ width: '150px', height: '130px' }}
								/>
							)}
						</div>
						<div className="mb-3">
							<label htmlFor="description" className="form-label">
								توضیحات
							</label>

							<CKEditor
								editor={ClassicEditor}
								data=""
								config={{
									// Use the German language for this editor.
									language: 'fa'

									// ...
								}}
								name="data"
								onReady={(editor) => {
									// You can store the "editor" and use when it is needed.
									console.log('Editor is ready to use!', editor);
								}}
								onChange={(event, editor) => {
									const data = editor.getData();
									setDescription(data);
								}}
							/>
						</div>
						<div className="d-grid">
							<Button className="btn btn-danger" type="submit">
								ایجاد
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default PostCreateNewScreen;
