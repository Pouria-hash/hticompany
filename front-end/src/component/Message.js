import React from 'react';
import { Row, Col, Alert, Container } from 'react-bootstrap';

const Message = ({ variant, message }) => {
	return (
		<Container>
			<Row className="justify-content-center d-flex mt-1">
				<Col xs={11}>
					<Alert variant={variant}>{message}</Alert>
				</Col>
			</Row>
		</Container>
	);
};

export default Message;
