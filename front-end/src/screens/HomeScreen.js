import React, { useEffect } from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styleSheets/home.css';
import { listOfProject } from '../action/projectAction';
import Loading from '../component/Loading';
import Message from '../component/Message';
import ProjectCard from '../component/ProjectCard';
import ServiceCard from '../component/ServiceCard';
import { homeListPost } from '../action/blogAction';
import Meta from '../component/Meta';

const services = [
	{
		title: 'ساخت و اجرا',
		image:
			'https://res.cloudinary.com/dhz3fae76/image/upload/v1617984766/HT-Company/IMG_20210201_211104_vpijrj.jpg',
		description:
			'اين شرکت با در اختيار داشتن مديران و کارشناسان اجرايی مجرب، امکانات اجرايی مناسب، بكارگيری گروه های اجرايی  متخصص ، کارهای اجرایی پروژه ها را با سرعت و کیفیت مطلوب مطابق با مشخصات فنی و آیین نامه های تعیین شده اجرا، نصب، پیش راه اندازی و راه اندازی می نماید. '
	},

	{
		title: 'تامین نیروی انسانی متخصص',
		image:
			'https://res.cloudinary.com/dhz3fae76/image/upload/v1618047152/HT-Company/photo-1558227691-41ea78d1f631_vidhhw.jpg',
		description:
			'شرکت با بهره گیری از پشتوانه مهندسی و مدیریتی منسجم و نیروی متخصص ، این خدمات را در راستای اجرای سریع، با كيفيت  ارائه نموده است.'
	}
];

const HomeScreen = () => {
	const dispatch = useDispatch();

	const projectList = useSelector((state) => state.projectList);
	const { error, loading, projects } = projectList;

	const { error: postError, loading: postLoading, posts } = useSelector((state) => state.postHomeList);
	useEffect(
		() => {
			dispatch(listOfProject());
			dispatch(homeListPost());
		},
		[ dispatch ]
	);

	return (
		<Container fluid className="p-0">
			<Meta />
			<header className="hero">
				<div className="d-flex justify-content-start h-100 align-items-center">
					<div className="contant ">
						<div>
							<h1>
								<span id="co-name">هدف توسعه ایرانیان</span>
							</h1>
						</div>
						<div>
							<span id="co-sub-name">شرکت مهندسی</span>
						</div>
					</div>
				</div>
			</header>
			<main>
				<Container>
					<Row className="">
						<Col lg={7}>
							<h4 className="home-header">درباره شرکت</h4>

							<p className="text-align-justify lh-lg about-text">
								با تکیه بر دانش فنی و تخصص ها و تجربیات اجرائی مدیران خود در تاريخ 1379 در اداره ثبت
								شركتها و مالكيت صنعتي تهران به ثبت رسید.<br /> از تاريخ تاسيس تا كنون اين مجموعه در
								پروژه هاي مختلف تاسيساتي، خطوط لوله آب، نفت و گاز و همچنين پروژه هاي توسعه صنعتی نفت و
								گاز و پتروشیمی حضور فعال داشته و عليرغم وجود مشکلات مختلف اجرايي ، با ارائه راه كارهاي
								اجرايي مناسب، بيش از 30 پروژه مختلف را به اجرا در آورده است.شرکت هدف توسعه ایرانیان با
								ایجاد توانمندی لازم در حوزه‌های ساخت و نصب تجهیزات پروژه‌های صنعتی توانسته است با ارائه
								همزمان خدمات ساخت و تامین تجهیزات به سرعت و کیفیت کار خویش بیافزاید.
							</p>
						</Col>
						<Col lg={5}>
							<Image
								src="https://res.cloudinary.com/dhz3fae76/image/upload/v1617378198/HT-Company/IMG_20190618_103728_qzwcyf.jpg"
								alt="hadaf tosee honor"
								className=" about-image shadow"
							/>
						</Col>
					</Row>
				</Container>

				<div className="my-5 p-3 scope-field">
					<Container>
						<h4 className="fs-2 home-header text-center ">دامنه خدمات</h4>
						<div className="card-container mt-4">
							{services.map((service, index) => (
								<div className="mt-3" key={index}>
									<ServiceCard service={service} className="mb-2" />
								</div>
							))}
						</div>
					</Container>
				</div>

				<div className="my-5 why-choose ">
					<Container>
						<Row className="justify-content-center p-3">
							<Col md={5} className="">
								<Image
									src="https://res.cloudinary.com/dhz3fae76/image/upload/v1618047313/HT-Company/about_1_att25l.jpg"
									alt="plan"
									className="img-fluid"
								/>
							</Col>
							<Col md={5} className="mt-5">
								<h5 className="text-danger ">دلیل انتخاب ما</h5>
								<h3 className="fw-bold mb-4">بیش از 15 سال تجربه در صنعت</h3>
								<p className="text-align-justify">
									شركت مهندسی هدف توسعه ایرانیان از بدو تأسیس، بعنوان یكی از شرکتهای مهندسی مطرح در
									صنایع نفت و فولاد و معادن طیف گسترده ای از خدمات را به این صنایع ارائه داده و طرحهای
									عمده ای را در سطح ملی با موفقیت به پایان رسانیده است.
								</p>
								<Row className="mb-3 align-items-baseline">
									<Col xs={4}>
										<Image
											src="https://res.cloudinary.com/dhz3fae76/image/upload/v1618047276/HT-Company/photo-1564182842519-8a3b2af3e228_su2bl4.jpg"
											alt="expert in building"
											className="img-choose"
										/>
									</Col>
									<Col xs={8}>
										<p className="fs-5 fw-bold">نیروهای متخصص</p>
									</Col>
								</Row>
								<Row className="mb-3 align-items-baseline">
									<Col xs={4}>
										<Image
											src="https://res.cloudinary.com/dhz3fae76/image/upload/v1618047292/HT-Company/photo-1581093206409-01076de81a1b_rfnpu4.jpg"
											alt="Mechanical Engineering"
											className="img-choose"
										/>
									</Col>
									<Col xs={8}>
										<p className="fs-5 fw-bold">مهندسی مکانیک</p>
									</Col>
								</Row>
								<Row className="align-items-baseline">
									<Col xs={4}>
										<Image
											src="https://res.cloudinary.com/dhz3fae76/image/upload/v1618047303/HT-Company/photo-1541888946425-d81bb19240f5_lk6jh1.jpg"
											alt="Expert in Builings"
											className="img-choose"
										/>
									</Col>
									<Col xs={8}>
										<p className="fs-5 fw-bold">متخصص در اجرا</p>
									</Col>
								</Row>
							</Col>
						</Row>
					</Container>
				</div>

				<div className="my-5 p-4" id="project-container">
					<Container>
						<h4 className="fs-2 p-3 text-center home-header">پروژه های منتخب</h4>
						{loading ? (
							<Loading />
						) : error ? (
							<Message variant="danger" message={error} />
						) : (
							<div className="card-container">
								{projects &&
									projects.length > 0 &&
									projects.slice(0, 3).map((project) => (
										<div className=" my-3" key={project._id}>
											<ProjectCard project={project} />
										</div>
									))}
							</div>
						)}
						<div className="d-flex justify-content-center ">
							<Link to="/projects" className="btn btn-primary">
								آرشیو پروژه ها
							</Link>
						</div>
					</Container>
				</div>

				<div className="my-5 p-4">
					<Container>
						<h4 className="fs-2 mb-3 home-header">اخبار و تازه ها</h4>
						{postLoading ? (
							<Loading />
						) : postError ? (
							<Message variant="danger" message={postError} />
						) : (
							<div className="d-flex flex-md-row flex-column  justify-content-evenly">
								{posts &&
									posts.length > 0 &&
									posts.map((post) => (
										<div className="post mb-3 mb-md-0 mx-2" key={post._id}>
											<Link to={`/blog/post/${post._id}`}>
												<Image
													src={post.image.path}
													alt={post.title}
													className=" post-link mb-3 post-image"
												/>
											</Link>

											<Link to={`/blog/post/${post._id}`} className="post-link">
												<p className="fs-5 ">{post.title}</p>
											</Link>
											<p className="text-muted">{post.createdAt.substring(0, 10)}</p>
										</div>
									))}
							</div>
						)}
					</Container>
				</div>
			</main>
		</Container>
	);
};

export default HomeScreen;
