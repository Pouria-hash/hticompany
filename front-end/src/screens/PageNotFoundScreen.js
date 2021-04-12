import React from 'react';
import { Link } from 'react-router-dom';
import Meta from '../component/Meta';
const PageNotFoundScreen = () => {
	return (
		<div className="text-center my-5 p-5">
			<Meta title="صفحه پیدا نشد | 404 - شرکت هدف توسعه ایرانیان" description="" />
			<h1 className="mb-4">متاسفانه صفحه ای که به دنبال آن هستید پیدا نشد.</h1>
			<h4 className="mb-4">We couldn't find the page you're looking for</h4>
			<h4 style={{ fontSize: '6em', marginBottom: '20px' }}>404</h4>
			<p>
				می توانید به{' '}
				<Link to="/" className="text-decoration-none text-danger">
					صفحه نخست
				</Link>{' '}
				مراجعت نموده و یا در{' '}
				<Link to="/contact" className="text-decoration-none text-danger">
					صفحه تماس
				</Link>{' '}
				با ما سوال خود را از ما بپرسید.
			</p>
		</div>
	);
};

export default PageNotFoundScreen;
