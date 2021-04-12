import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import '../styleSheets/blogPost.css';

const Post = ({ post }) => {
	const description = parse(post.description.substring(0, 300));

	return (
		<Container className=" p-4 border-bottom post-container">
			<Row>
				<img src={post.image.path} alt={post.title} className=" pb-3" />
				<p className="text-muted">ارسال شده در تاریخ: {post.createdAt.substring(0, 10)} | مدیر</p>
				<h2 className="pb-2">
					<Link to={`/blog/post/${post._id}`} className="header-post">
						{post.title}
					</Link>
				</h2>
				<div>{description}</div>
			</Row>
		</Container>
	);
};

export default Post;
