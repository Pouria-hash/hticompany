import React from 'react';
import { Image } from 'react-bootstrap';

const BusinessField = ({ business }) => {
	return (
		<div className="business-card">
			<Image src={business.image} alt={business.title} className="business-image " />
			<h5 className="text-center mt-2 fw-light">{business.title}</h5>
		</div>
	);
};

export default BusinessField;
