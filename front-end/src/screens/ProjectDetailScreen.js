import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container, ListGroup, Alert } from 'react-bootstrap';
import { detailProject } from '../action/projectAction';
import Loading from '../component/Loading';
import Message from '../component/Message';
import '../styleSheets/project.css';
import { Link } from 'react-router-dom';
import Meta from '../component/Meta';
import Carousel from '../component/Carousel';

const ProjectDetailScreen = ({ history, match }) => {
	const { id } = match.params;
	const dispatch = useDispatch();
	const projectDetail = useSelector((state) => state.projectDetail);
	const { error, loading, project } = projectDetail;

	useEffect(
		() => {
			dispatch(detailProject(id));
		},
		[ dispatch, id ]
	);

	return loading ? (
		<Loading />
	) : error ? (
		<Message variant="danger" message={error} />
	) : !project.title ? (
		<Container className="my-5">
			<Alert variant="danger">
				پروژه ای برای مشاهده وجود ندارد. برای مشاهده پروژه های{' '}
				{
					<Link to="/projects" className="text-decoration-none text-danger">
						اینجا
					</Link>
				}{' '}
				کلیلک کنید.
			</Alert>
		</Container>
	) : (
		<div className="mb-4">
			<Meta title={`${project.title} - شرکت هدف توسعه ایرانیان`} />
			<header>
				<div
					style={{
						background: `linear-gradient(to left bottom ,#25252583 , #3b393944 ) , url(${project.images[0]
							.path})`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						height: '70vh',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<h2 className="text-center text-light w-75 border-bottom pb-2">{project.title}</h2>
					<h5 className="text-light">تاریخ اتمام پروژه {project.year}</h5>
				</div>
			</header>
			<Container className="mt-5">
				<div className="d-flex flex-row navigation">
					<Link to="/" className="text-decoration-none">
						صفحه نخست
					</Link>
					{'  '}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-chevron-left"
						viewBox="0 0 14 14"
					>
						<path
							fillRule="evenodd"
							d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
						/>
					</svg>{' '}
					<Link to="/projects" className="text-decoration-none">
						پروژه ها
					</Link>
					{'  '}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-chevron-left"
						viewBox="0 0 14 14"
					>
						<path
							fillRule="evenodd"
							d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
						/>
					</svg>{' '}
					<p>{project.title}</p>
				</div>
				<Row>
					<div className="col-lg-8 order-lg-2 order-1">
						<Carousel images={project.images} />
					</div>
					<Col lg={4} className="order-lg-1 order-2 mt-3 mt-md-0">
						<ListGroup variant="flush" className="project-content">
							<ListGroup.Item>
								<h5 className="text-dark">کارفرما : </h5>
								<p className="text-secondary">{project.client}</p>
							</ListGroup.Item>
							<ListGroup.Item>
								<h5 className="text-dark">سال اتمام پروژه : </h5>
								<p className="text-secondary">{project.year}</p>
							</ListGroup.Item>
							<ListGroup.Item>
								<h5 className="text-dark">محل پروژه :</h5>
								<p className="text-secondary">
									{project.location && project.location.state} -{' '}
									{project.location && project.location.city}
								</p>
							</ListGroup.Item>
							<ListGroup.Item>
								<h5 className="text-dark">تعداد کارکنان :</h5>
								<p className="text-secondary">{project.employees} نفر</p>
							</ListGroup.Item>
							<ListGroup.Item>
								<p className="text-secondary lh-lg" style={{ textAlign: 'justify' }}>
									{project.description}
								</p>
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
				<Row className="mt-5">
					<Col className="d-flex flex-row justify-content-evenly flex-wrap">
						{project.images.map((image, index) => (
							<div key={index} className="my-1">
								<img
									src={image.path}
									alt={image.filename}
									className=""
									style={{
										width: '16rem',
										height: '13rem',
										objectFit: 'cover',
										padding: '5px',
										border: '2px solid #c9c9c9',
										borderRadius: '5px'
									}}
								/>
							</div>
						))}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default ProjectDetailScreen;
