import React from 'react';
import { Helmet } from 'react-helmet-async';
const Meta = ({ title, description }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'شرکت هدف توسعه ایرانیان',
	description:
		'شرکت مهندسی هدف توسعه ایرانیان، تاسيس ۱۳۸۰ درباره ما شركت مهندسی هدف توسعه ایرانیان از بدو تأسیس در سال ۱۳۸۰، بعنوان یكی از شرکتهای مهندسی مطرح در صنایع نفت و فولاد و معادن طیف گسترده ای از خدمات را به این صنایع ارائه داده و طرحهای عمده ای را در سطح ملی با…'
};

export default Meta;
