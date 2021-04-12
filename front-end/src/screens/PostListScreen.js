import React, { useEffect } from 'react';
import { Row, Container, Col, Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOfPost } from '../action/blogAction';
import Loading from '../component/Loading';
import Message from '../component/Message';
import { deletePost } from '../action/blogAction';
import { post_delete_reset } from '../constans/blogConstans';
import Meta from '../component/Meta';

const PostListScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { error, loading, posts } = useSelector((state) => state.postList);

	const { error: deleteError, loading: deleteLoading, message, success } = useSelector((state) => state.postDelete);

	useEffect(
		() => {
			if (!userInfo || !userInfo.isAdmin) {
				history.push('/login?redirect=admin/posts');
			} else if (success) {
				setTimeout(() => {
					dispatch({ type: post_delete_reset });
				}, 3000);
			} else {
				dispatch(listOfPost());
			}
		},
		[ dispatch, history, userInfo, success ]
	);
	const handleDelete = (postId) => {
		if (window.confirm('آیا مطمعن هستید؟')) {
			dispatch(deletePost(postId));
		}
	};
	return loading ? (
		<div className="vh-100">
			<Loading />
		</div>
	) : error ? (
		<div className="mt-5">
			<Message variant="danger" message={error} />
		</div>
	) : (
		<Container className="my-5 pt-5">
			<Meta title="لیست پست ها - شرکت هدف توسعه ایرانیان" description="" />
			<Row className="d-flex">
				{deleteLoading && <Loading />}
				{deleteError && <Message variant="danger" message={deleteError} />}
				{message && <Message variant="success" message={message} />}
				<Col md={6}>
					<h2>لیست پست ها</h2>
				</Col>
				<Col md={2} className="me-auto">
					<Link to="/admin/posts/new" className="btn btn-primary">
						ایجاد پست جدید
					</Link>
				</Col>
			</Row>
			<Table striped hover responsive className="table text-center align-middle">
				<thead>
					<tr>
						<th>ردیف</th>
						<th>عنوان</th>
						<th>تاریخ ایجاد</th>
						<th>نویسنده</th>
						<th />
						<th />
					</tr>
				</thead>
				<tbody>
					{posts &&
						posts.map((post) => (
							<tr key={post._id}>
								<td>{posts.indexOf(post) + 1}</td>
								<td>
									<Link to={`/blog/post/${post._id}`}>{post.title}</Link>
								</td>
								<td>{post.createdAt.substring(0, 10)}</td>
								<td>{post.user.username}</td>
								<td>
									<Link to={`/admin/posts/${post._id}/edit`} className="btn btn-dark btn-sm">
										ویرایش
									</Link>

									<Button
										className="btn btn-danger btn-sm me-2"
										onClick={() => handleDelete(post._id)}
									>
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

export default PostListScreen;
