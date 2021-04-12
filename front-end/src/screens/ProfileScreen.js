import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { updateUserProfile } from '../action/userAction';
import { user_profile_update_reset } from '../constans/userConstans';
import Loading from '../component/Loading';
import Message from '../component/Message';
import Meta from '../component/Meta';
import { logoutUser } from '../action/userAction';

const ProfileScreen = ({ history }) => {
	const { userInfo } = useSelector((state) => state.userLogin);
	const dispatch = useDispatch();
	const { error, loading, message, success } = useSelector((state) => state.userProfileUpdate);
	useEffect(
		() => {
			if (!userInfo || !userInfo.name) {
				history.push('/login?redirect=profile');
			} else if (success) {
				setTimeout(() => {
					dispatch({ type: user_profile_update_reset });
				}, 3000);
			}
		},
		[ history, userInfo, success, dispatch ]
	);
	const handleLogout = () => {
		dispatch(logoutUser());
	};
	return (
		<Formik
			initialValues={{
				email: userInfo && userInfo.email ? userInfo.email : '',
				name: userInfo && userInfo.name ? userInfo.name : '',
				oldPassword: '',
				newPassword: ''
			}}
			validationSchema={Yup.object({
				email: Yup.string().required(),
				name: Yup.string().required(),
				oldPassword: Yup.string(),
				newPassword: Yup.string().matches(
					/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
					'Invalid password'
				)
			})}
			onSubmit={(values) => {
				dispatch(updateUserProfile(values));
			}}
		>
			{({ errors, touched }) => (
				<Container className="my-5 pt-5">
					<Meta title="مشاهده پروفایل - شرکت هدف توسعه ایرانیان" description="" />
					<Row>
						{loading && <Loading />}
						{error && <Message variant="danger" message={error} />}
						{message && <Message variant="success" message={message} />}
						<Col md={6} lg={4} className="py-5 px-4 card shadow my-4 ">
							<h1>سلام {userInfo && userInfo.name && userInfo.name}</h1>
							<Form>
								<div className="mb-3">
									<label htmlFor="email" className="form-label">
										ایمیل
									</label>
									<Field name="email" type="text" className="form-control" placeholder="ایمیل" />
									{errors.email && touched.email ? <p className="text-danger">{errors.email}</p> : ''}
								</div>
								<div className="mb-3">
									<label htmlFor="name" className="form-label">
										نام و نام خانوادگی
									</label>
									<Field
										name="name"
										type="text"
										className="form-control"
										placeholder="نام و نام خانوادگی"
									/>
									{errors.name && touched.name ? <p className="text-danger">{errors.name}</p> : ''}
								</div>
								<div className="mb-3">
									<label htmlFor="oldPassword" className="form-label">
										پسورد قدیمی
									</label>
									<Field
										name="oldPassword"
										type="text"
										className="form-control"
										placeholder="پسورد قدیمی"
									/>
									{errors.oldPassword && touched.oldPassword ? (
										<p className="text-danger">{errors.oldPassword}</p>
									) : (
										''
									)}
								</div>
								<div className="mb-3">
									<label htmlFor="newPassword" className="form-label">
										پسورد جدید
									</label>
									<Field
										name="newPassword"
										type="text"
										className="form-control"
										placeholder="پسورد جدید"
									/>
									{errors.newPassword && touched.newPassword ? (
										<p className="text-danger">{errors.newPassword}</p>
									) : (
										''
									)}
								</div>
								<div className="d-grid">
									<button className="btn btn-danger">به روز رسانی</button>
								</div>
							</Form>
						</Col>
						<Col md={6} lg={4} className="mt-5 me-md-5">
							<ul className="p-md-5 p-lg-5">
								<li className="my-3 fs-5">
									<Link to="/admin/reviews" className="text-decoration-none text-secondary">
										مشاهده پیغام ها
									</Link>
								</li>
								<li className="my-3 fs-5">
									<Link to="/admin/projects" className="text-decoration-none text-secondary">
										مشاهده لیست پروژه ها
									</Link>
								</li>
								<li className="my-3 fs-5">
									<Link to="/admin/posts" className="text-decoration-none text-secondary">
										مشاهده پست ها
									</Link>
								</li>
								<li className="my-3">
									<button
										className="btn btn-link text-decoration-none text-danger fs-5"
										onClick={handleLogout}
									>
										خروج
									</button>
								</li>
							</ul>
						</Col>
					</Row>
				</Container>
			)}
		</Formik>
	);
};

export default ProfileScreen;
