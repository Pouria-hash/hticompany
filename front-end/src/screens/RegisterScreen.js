import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Container, Col, Row, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { registerUser } from '../action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import Loading from '../component/Loading';
import Meta from '../component/Meta';

const RegisterScreen = ({ history }) => {
	const dispatch = useDispatch();
	const [ showPassword, setShowPassword ] = useState(false);
	const [ showRepeatPassword, setShowRepeatPassword ] = useState(false);

	const { userInfo } = useSelector((state) => state.userLogin);
	const { error, loading } = useSelector((state) => state.userRegister);

	useEffect(
		() => {
			if (userInfo) {
				history.push('/');
			}
		},
		[ history, userInfo ]
	);
	return (
		<Formik
			initialValues={{
				username: '',
				password: '',
				email: '',
				repeatPassword: '',
				name: ''
			}}
			validationSchema={Yup.object({
				username: Yup.string().min(5, 'Too short').max(20, 'Too long').required('username required'),
				password: Yup.string()
					.matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/, 'Invalid password')
					.required('password required'),
				repeatPassword: Yup.string()
					.matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/, 'Invalid  password')
					.required('password required'),
				email: Yup.string().email('Invalid email address').required('email required'),
				name: Yup.string().required('name required')
			})}
			onSubmit={(values) => {
				dispatch(registerUser(values));
			}}
		>
			{({ errors, values, touched, isSubmitting }) => (
				<Container className="py-5 mt-5">
					<Meta title="ثبت نام - شرکت هدف توسعه ایرانیان" description="" />
					<Row className="">
						{error && <Message variant="danger" message={error} />}
						{loading && <Loading />}
						<Col md={7} sm={9} xs={12} lg={5} className=" card p-4 shadow mx-auto">
							<Form>
								<h1 className="mb-4">ثبت نام</h1>
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
									<div className="input-group">
										<Field
											type={!showPassword ? 'password' : 'text'}
											name="password"
											className="form-control"
											placeholder="پسورد"
											required
										/>
										<button
											className="btn btn-outline-secondary "
											onClick={() => setShowPassword(!showPassword)}
											type="button"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												className="bi bi-eye-fill"
												viewBox="0 0 17 17"
											>
												<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
												<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
											</svg>
										</button>
									</div>
									{
										<p className="text-danger">
											{errors.password && touched.password ? errors.password : null}
										</p>
									}
								</div>
								<div>
									<label htmlFor="repeatPassword" className="form-label">
										تکرار پسورد
									</label>
									<div className="input-group">
										<Field
											type={showRepeatPassword ? 'text' : 'password'}
											name="repeatPassword"
											className="form-control"
											placeholder="تکرار پسورد"
											required
										/>
										<button
											className="btn btn-outline-secondary "
											onClick={() => setShowRepeatPassword(!showRepeatPassword)}
											type="button"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="17"
												height="17"
												fill="currentColor"
												className="bi bi-eye-fill"
												viewBox="0 0 17 17"
											>
												<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
												<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
											</svg>
										</button>
									</div>
									{
										<p className="text-danger">
											{errors.repeatPassword && touched.repeatPassword ? (
												errors.repeatPassword
											) : null}
										</p>
									}
								</div>
								<div>
									<label htmlFor="email" className="form-label">
										ایمیل
									</label>
									<Field
										type="text"
										name="email"
										className="form-control"
										placeholder="ایمیل"
										required
									/>
									{
										<p className="text-danger">
											{errors.email && touched.email ? errors.email : null}
										</p>
									}
								</div>
								<div>
									<label htmlFor="name" className="form-label">
										نام و نام خانوادگی
									</label>
									<Field
										type="text"
										name="name"
										className="form-control"
										placeholder="نام و نام خانوادگی"
										required
									/>
									{<p className="text-danger">{errors.name && touched.name ? errors.name : null}</p>}
								</div>
								<div>
									<Button className="btn btn-danger" type="submit">
										ثبت نام
									</Button>
								</div>
							</Form>
						</Col>
					</Row>
				</Container>
			)}
		</Formik>
	);
};

export default RegisterScreen;
