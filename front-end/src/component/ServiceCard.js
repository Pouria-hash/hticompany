import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
	return (
		<div>
			<Card className="service-card">
				<Card.Img src={service.image} alt={service.title} className="service-image" />
				<Card.Body>
					<Link to={`/services/${service.title}`} className="text-decoration-none">
						<Card.Title className="text-center fs-6 ">{service.title}</Card.Title>
					</Link>
					<Card.Text style={{ fontSize: '13px', lineHeight: '1.4rem' }} className="mt-3 text-align-justify">
						{service.description}
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	);
};

export default ServiceCard;
