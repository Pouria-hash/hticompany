import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Table } from 'react-bootstrap';
import Loading from '../component/Loading';
import Message from '../component/Message';
import { adminListOfProject, deleteProject } from '../action/projectAction';
import { Link } from 'react-router-dom';
import { project_delete_reset } from '../constans/projectConstans';
import Meta from '../component/Meta';

const ProjectListScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const projectAdminList = useSelector((state) => state.projectAdminList);
	const { error, loading, projects } = projectAdminList;

	const { error: deleteError, loading: deleteLoading, success, message } = useSelector(
		(state) => state.projectDelete
	);

	useEffect(
		() => {
			if (!userInfo || !userInfo.isAdmin) {
				history.push('/projects');
			} else {
				dispatch(adminListOfProject());
				if (success) {
					setTimeout(() => {
						dispatch({ type: project_delete_reset });
					}, 3000);
				}
			}
		},
		[ dispatch, userInfo, history, success ]
	);
	const handleDelete = (id) => {
		if (window.confirm('آیا مطمعن هستید؟')) {
			dispatch(deleteProject(id));
		}
	};
	return loading ? (
		<div className="vh-100">
			<Loading />
		</div>
	) : error ? (
		<div className="mt-5 pt-5">
			<Message variant="danger" message={error} />
		</div>
	) : (
		<Container className="my-5 pt-5">
			<Meta title="لیست پروژه ها - شرکت هدف توسعه ایرانیان" description="" />
			{deleteLoading && <Loading />}
			{message && <Message variant={success ? 'success' : 'danger'} message={message} />}
			{deleteError && <Message variant="danger" message={deleteError} />}
			<div className="d-flex felx-row mb-4 justify-content-between">
				<div>
					<h2>لیست پروژه ها</h2>
				</div>
				<div>
					<Link to="/admin/projects/new" className="btn btn-primary ms-auto">
						ایجاد پروژه جدید
					</Link>
				</div>
			</div>

			<Table striped hover responsive className=" text-center align-middle">
				<thead>
					<tr>
						<th>ردیف</th>
						<th>عنوان</th>
						<th>محل</th>
						<th>سال</th>
						<th>کارفرما</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{projects &&
						projects.length !== 0 &&
						projects.map((project) => (
							<tr key={project._id}>
								<td>{projects.indexOf(project) + 1}</td>
								<td>
									<Link to={`/projects/${project._id}`} className="text-decoration-none">
										{project.title}
									</Link>
								</td>
								<td>
									{project.location.state}, {project.location.city}
								</td>
								<td>{project.year}</td>
								<td>{project.client}</td>
								<td>
									<Link
										to={`/admin/projects/${project._id}/edit`}
										className="btn btn-dark btn-sm ms-1"
									>
										ویرایش
									</Link>
									<Button onClick={() => handleDelete(project._id)} className="btn btn-danger btn-sm">
										پاک کردن
									</Button>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</Container>
	);
};

export default ProjectListScreen;
