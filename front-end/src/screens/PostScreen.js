import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { detailPost } from '../action/blogAction';
import Loading from '../component/Loading';
import Message from '../component/Message';
import '../styleSheets/post.css';
import parse from 'html-react-parser';
import Meta from '../component/Meta';

const PostScreen = ({ match }) => {
	const id = match.params.id;

	const postDetail = useSelector((state) => state.postDetail);
	const { error, loading, post } = postDetail;

	const dispatch = useDispatch();
	useEffect(
		() => {
			dispatch(detailPost(id));
		},
		[ dispatch, id ]
	);

	return loading ? (
		<Loading />
	) : error ? (
		<Message variant="danger" message={error} />
	) : (
		<div>
			<Meta title={`${post.title} - شرکت هدف توسعه ایرانیان`} />
			<div
				className="post-header"
				style={{
					backgroundImage: `linear-gradient(#0000005e , #0000005e ) , url('${post.image && post.image.path}')`
				}}
			>
				<h1>{post.title}</h1>
				<p>
					<strong>ارسال شده در تاریخ :</strong> {post.createdAt && post.createdAt.substring(0, 10)}
				</p>
			</div>
			<Container className="my-5 p-4">
				{!post.title && <Message variant="danger" message="پست مورد نظر پیدا نشد." />}

				<div>{post.description && parse(post.description)}</div>
			</Container>
		</div>
	);
};

export default PostScreen;
