import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { listOfPost } from '../action/blogAction';
import Post from '../component/Post';
import Loading from '../component/Loading';
import Message from '../component/Message';
import '../styleSheets/blog.css';
import { Link } from 'react-router-dom';
import Meta from '../component/Meta';

const BlogScreen = () => {
	const dispatch = useDispatch();
	const postList = useSelector((state) => state.postList);
	const { loading, error, posts } = postList;

	useEffect(
		() => {
			dispatch(listOfPost());
		},
		[ dispatch ]
	);

	return (
		<div>
			<Container className="my-5 py-5 ">
				<Meta
					title="اخبار و تازه ها - شرکت هدف توسعه ایرانیان"
					description="تازه ترن خبرهای مرتبط با شرکت را از اینجا پیگیری کنید."
				/>
				<Row>
					<Col md={4} className=" order-2 order-md-1 ">
						<div className="recent-posts-container">
							<div className="p-3">
								<p className="fs-4">تازه ترین خبر ها</p>
								{loading ? (
									<Loading />
								) : error ? (
									<Message variant="danger" message={error} />
								) : (
									posts.slice(0, 3).map((post) => (
										<Row className="p-2 recent-posts" key={post._id}>
											<Col xs={4}>
												<Link to={`/blog/post/${post._id}`}>
													<img src={post.image.path} alt={post.title} className="" />
												</Link>
											</Col>
											<Col xs={8}>
												<Link
													to={`/blog/post/${post._id}`}
													className="text-decoration-none text-dark"
												>
													<p className="">{post.title}</p>
												</Link>
											</Col>
										</Row>
									))
								)}
							</div>
							<div className=" p-4 rounded position-sticky contact-container">
								<p className="fs-4">ارتباط با ما </p>
								<p className="">برای ارتباط با ما می توانید از راه های زیر اقدام کنید.</p>
								<Row>
									<Col xs={2}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="30"
											height="30"
											fill="currentColor"
											className="bi bi-telephone text-light"
											viewBox="0 0 16 16"
										>
											<path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
										</svg>
									</Col>
									<Col xs={8}>
										<p>09166174025</p>
										<p>hadaf-tosee@gmail.com</p>
									</Col>
								</Row>
							</div>
						</div>
					</Col>
					<Col md={8} className="order-1 order-md-2">
						{loading ? (
							<Loading />
						) : error ? (
							<Message variant="danger" message={error} />
						) : posts.length === 0 ? (
							<Message variant="danger" message="No post available" />
						) : (
							posts.map((post) => <Post post={post} key={post._id} />)
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default BlogScreen;
