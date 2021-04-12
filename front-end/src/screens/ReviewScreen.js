import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { listReview } from '../action/reviewAction';
import Loading from '../component/Loading';
import Message from '../component/Message';
import Meta from '../component/Meta';

const ReviewScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { error, loading, reviews, errorBackend } = useSelector((state) => state.reviewList);

	useEffect(
		() => {
			if (userInfo && userInfo.isAdmin) {
				dispatch(listReview());
			} else {
				history.push('/');
			}
		},
		[ dispatch, userInfo, history ]
	);

	return (
		<Container className="my-5 py-5">
			<h1 className="mb-4">پیغام ها</h1>
			{loading ? (
				<Loading />
			) : error ? (
				<Message variant="danger" message={error} />
			) : errorBackend ? (
				<Message variant="danger" message={errorBackend} />
			) : reviews.length === 0 ? (
				<div>
					<Message variant="danger" message="پیغامی برای مشاهده وجود ندارد." />
				</div>
			) : (
				<div className="d-flex flex-row flex-wrap justify-content-evenly ">
					<Meta title="لیست پیغام ها - شرکت هدف توسعه ایرانیان" description="" />
					{reviews.map((review) => (
						<Card style={{ width: '25rem' }} className="p-3 m-2" key={review._id}>
							<Card.Body>
								<Card.Title className="text-dark">{review.fullName}</Card.Title>
								<Card.Subtitle className="text-dark">{review.createdAt}</Card.Subtitle>
								<ListGroup variant="flush">
									<ListGroup.Item className="text-dark">شماره تماس: {review.phone}</ListGroup.Item>
									<ListGroup.Item className="text-dark">پست الکترونیک: {review.email}</ListGroup.Item>
									<ListGroup.Item className="text-dark">
										<Card.Text className="text-dark">{review.description}</Card.Text>
									</ListGroup.Item>
								</ListGroup>
							</Card.Body>
						</Card>
					))}
				</div>
			)}
		</Container>
	);
};

export default ReviewScreen;
