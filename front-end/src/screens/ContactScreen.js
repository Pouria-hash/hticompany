import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../styleSheets/contactScreen.css';
import { newReview } from '../action/reviewAction';
import { review_new_reset } from '../constans/reviewConstans';
import Loading from '../component/Loading';
import Message from '../component/Message';
import Meta from '../component/Meta';

const ContactScreen = () => {
	const dispatch = useDispatch();
	const [ fullName, setFullName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ description, setDescription ] = useState('');

	const { error, loading, message, success } = useSelector((state) => state.reviewNew);

	useEffect(
		() => {
			if (success) {
				setFullName('');
				setEmail('');
				setPhone('');
				setDescription('');
				setTimeout(() => {
					dispatch({ type: review_new_reset });
				}, 5000);
			}
		},
		[ success, dispatch ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(newReview({ fullName, email, phone, description }));
	};

	return (
		<div className="">
			<Meta
				title="ارتباط با ما - شرکت هدف توسعه ایرانیان"
				description="شرکت هدف توسعه ایرانیان : شاهین شهر - شماره تماس : 09166174025 - ایمیل: hadaftose-iraninan@gmail.com- به منظور ارتباط با ما می توانید فرم زیر را تکمیل و برای ما ارسال کنید"
			/>
			<header className="header text-center justify-content-center align-items-center d-flex flex-column">
				<div className="header-content">
					<h1 className="text-light header-title">تماس با ما</h1>
					<p className="fs-5 text-light">شرکت هدف توسعه ایرانیان</p>
				</div>
			</header>
			<main>
				<Container className="my-5 p-4">
					<Row>
						<Col
							md={6}
							className="order-md-1 text-end align-items-start justify-content-center d-flex flex-column"
						>
							<div className="mb-5">
								<h5>
									<span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="25"
											height="25"
											fill="currentColor"
											className="bi bi-geo-alt text-danger"
											viewBox="0 0 16 16"
										>
											<path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
											<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
										</svg>
									</span>{' '}
									آدرس:
								</h5>
								<div className="me-5">
									<p className="m-0">شاهین شهر </p>
									<p>
										<strong>کدپستی:</strong> 6666666
									</p>
								</div>
							</div>
							<div className="mb-5">
								<h5>
									<span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="25"
											height="25"
											fill="currentColor"
											className="bi bi-telephone text-danger"
											viewBox="0 0 16 16"
										>
											<path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
										</svg>
									</span>{' '}
									شماره تماس:
								</h5>
								<p className="me-5">09166174025</p>
							</div>
							<div className="mb-5">
								<h5>
									<span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="25"
											height="25"
											fill="currentColor"
											className="bi bi-envelope text-danger"
											viewBox="0 0 16 16"
										>
											<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
										</svg>
									</span>{' '}
									پست الکترونیک:
								</h5>
								<p className="me-5">hadaf-toseh@gmail.com</p>
							</div>
						</Col>
						<Col md={6} className="order-md-2">
							<div>
								<img
									src="https://res.cloudinary.com/dhz3fae76/image/upload/v1617191909/HT-Company/photo-1604357209793-fca5dca89f97_jpytef.jpg"
									className="img-fluid"
									style={{ width: '100%', height: '500px', objectFit: 'cover' }}
									alt="location"
								/>
							</div>
						</Col>
					</Row>
				</Container>
				<section id="contact-section">
					<div className="text-center">
						<h3 className="mb-3">فرم ارتباط با ما</h3>
						<p>
							بازدیدکننده گرامی به منظور ارتباط با ما می توانید فرم زیر را تکمیل و برای ما ارسال فرمایید.
						</p>
					</div>
					<Container>
						<Row className="text-end d-flex justify-content-center">
							<Col md={6}>
								{loading && <Loading />}
								{error && <Message variant="danger" message={error} />}
								{message && <Message variant="success" message={message} />}
								<Form onSubmit={submitHandler}>
									<Form.Group controlId="fullName" className="mb-3">
										<Form.Label>نام و نام خانوادگی</Form.Label>
										<Form.Control
											type="text"
											value={fullName}
											placeholder="نام و نام خانوادگی"
											onChange={(e) => setFullName(e.target.value)}
										/>
									</Form.Group>
									<Form.Group controlId="email" className="mb-3">
										<Form.Label>ایمیل</Form.Label>
										<Form.Control
											type="text"
											value={email}
											placeholder="ایمیل"
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Form.Group>
									<Form.Group controlId="phone" className="mb-3">
										<Form.Label>تلفن </Form.Label>
										<Form.Control
											type="text"
											placeholder="تلفن"
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
										/>
									</Form.Group>
									<Form.Group controlId="description" className="mb-3">
										<Form.Label>توضیحات</Form.Label>
										<textarea
											className="form-control"
											rows="8"
											value={description}
											placeholder="توضیحات"
											onChange={(e) => setDescription(e.target.value)}
										/>
									</Form.Group>
									<div>
										<Button type="submit" className="btn btn-danger">
											ارسال
										</Button>
									</div>
								</Form>
							</Col>
						</Row>
					</Container>
				</section>
			</main>
		</div>
	);
};

export default ContactScreen;
