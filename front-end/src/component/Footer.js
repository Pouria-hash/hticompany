import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className="footer mt-auto p-3">
			<Container>
				<Row>
					<Col lg={4}>
						<div className="d-flex d-lg-block justify-content-center ">
							<h3 className="mb-4 ">
								شرکت <span id="head"> هدف توسعه </span>
							</h3>
						</div>
						<p className="text-align-justify lh-lg" style={{ fontSize: '14px' }}>
							شرکت هدف توسعه ایرانیان در سال 1383 تأسیس گردیده و در هفده سال گذشته بیش از ده پروژه را به
							اتمام رسانده است.
						</p>
					</Col>
					<Col lg={5}>
						<Row>
							<Col lg={6} md={6}>
								<h5>لینک های کاربردی</h5>
								<ul>
									<Link to="/blog" className="text-decoration-none">
										<li className="footer-li">اخبار و تازه ها</li>
									</Link>
									<Link to="/projects" className="text-decoration-none">
										<li className="footer-li">پروژه ها</li>
									</Link>
									<Link to="/contact" className="text-decoration-none">
										<li className="footer-li">تماس با ما</li>
									</Link>
									<Link to="/about" className="text-decoration-none">
										<li className="footer-li">درباره ما</li>
									</Link>
								</ul>
							</Col>
							<Col lg={6} md={6}>
								<h5>خدمات ما</h5>
								<ul>
									<Link to="#" className="text-decoration-none">
										<li className="footer-li">ظراحی و مهندسی</li>
									</Link>
									<Link to="#" className="text-decoration-none">
										<li className="footer-li">تامین کالا</li>
									</Link>
									<Link to="#" className="text-decoration-none">
										<li className="footer-li">ساخت و اجرا</li>
									</Link>
									<Link to="#" className="text-decoration-none">
										<li className="footer-li">تامین نیروی انسانی</li>
									</Link>
								</ul>
							</Col>
						</Row>
					</Col>
					<Col lg={3} md={6}>
						<h5>ارتباط با ما</h5>
						<ul>
							<li>
								<strong>دفتر مرکزی :</strong> شاهین شهر، منطقه دو
							</li>
							<li>
								<strong>شماره تماس :</strong> 021 - 88670410 + 88794922
							</li>
							<li>
								<strong>ایمیل :</strong> hadaf_tosee@gmail.com
							</li>
							<li>
								<strong>آدرس وبسایت :</strong> hadaftosee.com
							</li>
						</ul>
					</Col>
				</Row>
				<Row>
					<Col className="text-center">Copyright &copy; Hadaf Tosee</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
