import React, { useEffect } from 'react';
import { Container, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listOfProject } from '../action/projectAction';
import Loading from '../component/Loading';
import Message from '../component/Message';
import { Link } from 'react-router-dom';
import '../styleSheets/projectsList.css';
import Meta from '../component/Meta';

const ProjectsScreen = () => {
	const dispatch = useDispatch();
	const projectList = useSelector((state) => state.projectList);
	const { projects, error, loading } = projectList;

	useEffect(
		() => {
			dispatch(listOfProject());
		},
		[ dispatch ]
	);
	return (
		<Container className="mb-4 p-0" fluid>
			<Meta
				title="آرشیو پروژها- شرکت هدف توسعه ایرانیان"
				description="پروژه هایی که طی چندین سال فعالیت در سطح کشوری و ملی به اتمام رسانیدیم."
			/>
			<div className="d-flex justify-content-center align-items-center project-header">
				<h1 className=" fw-bolder  py-2 px-5 text-center">پروژه ها</h1>
			</div>
			<Container>
				<div className="d-flex flex-row navigation mt-4 mb-3">
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
					<p className="text-muted">پروژه ها</p>
				</div>
				<div className=" projects-container">
					{loading ? (
						<Loading />
					) : error ? (
						<Message variant="danger" message={error} />
					) : (
						projects.map((project) => (
							<Col md={5} lg={4} className="my-2 project-container" key={project._id}>
								<Card className="project-card">
									<Link to={`/projects/${project._id}`}>
										<Card.Img
											src={
												project.images && project.images.length !== 0 && project.images[0].path
											}
											alt={project.title}
											className="project-card-img"
										/>
									</Link>
									<Card.Body className="project-card-body">
										<div className="card-body-content">
											<Link
												to={`/projects/${project._id}`}
												className="text-decoration-none text-dark"
											>
												<h3 className="card-content-title">{project.title}</h3>
											</Link>

											<p className="card-content-text m-0">اتمام پروژه در سال {project.year}</p>
										</div>
									</Card.Body>
								</Card>
							</Col>
						))
					)}
				</div>
			</Container>
		</Container>
	);
};

export default ProjectsScreen;
