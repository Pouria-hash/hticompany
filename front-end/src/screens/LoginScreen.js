import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { Container, Col, Row, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { loginUser } from '../action/userAction';
import Loading from '../component/Loading';
import Message from '../component/Message';
import Meta from '../component/Meta';

const LoginScreen = ({ history, location }) => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { message, loading, error, userInfo, success } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';
	useEffect(
		() => {
			if (userInfo) {
				history.push(redirect);
			}
		},
		[ history, userInfo, redirect ]
	);
	return (
		<Formik
			initialValues={{
				username: '',
				password: ''
			}}
			validationSchema={Yup.object({
				username: Yup.string().min(5, 'Too short').max(20, 'Too long').required('username required'),
				password: Yup.string()
					// .matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/, 'Invalid password')
					.required('password required')
			})}
			onSubmit={(values) => {
				dispatch(loginUser(values));
			}}
		>
			{({ errors, values, touched, isSubmitting }) => (
				<Container className="mt-5">
					<Meta title="ورود - شرکت هدف توسعه ایرانیان" description="" />
					<Row className="">
						{message && (
							<Message variant={success ? 'success' : 'danger'} message={message} className="mt-3" />
						)}
						{error && <Message variant="danger" message={error} className="mt-3" />}
						{loading && <Loading className="mt-3" />}
						<Col md={7} sm={9} xs={12} lg={5} className="card p-4 shadow mx-auto my-5">
							<Form>
								<h1 className="mb-4">ورود</h1>
								<div>
									<label htmlFor="username" className="form-label">
										نام کاربری
									</label>
									<Field
										type="text"
										name="username"
										className="form-control"
										placeholder="نام کاربری"
										required
									/>
									{
										<p className="text-danger">
											{errors.username && touched.username ? errors.username : null}
										</p>
									}
								</div>
								<div>
									<label htmlFor="password" className="form-label">
										پسورد
									</label>
									<Field
										type="password"
										name="password"
										className="form-control"
										placeholder="پسورد"
										required
									/>
									{
										<p className="text-danger">
											{errors.password && touched.password ? errors.password : null}
										</p>
									}
								</div>

								<div>
									<Button className="btn btn-danger" type="submit">
										ورود
									</Button>
								</div>
							</Form>
							<p className="text-muted mt-3 " style={{ fontSize: '13px' }}>
								اگر ثبت نام نکرده اید{' '}
								<Link className="text-decoration-none" to="/register">
									اینجا
								</Link>{' '}
								کلیلک کنید.
							</p>
						</Col>
					</Row>
				</Container>
			)}
		</Formik>
	);
};

export default LoginScreen;
