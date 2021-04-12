import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
	return (
		<div className="project-card">
			<Card style={{ width: '18rem', height: '30rem' }} className="position-relative">
				<Card.Img src={project.images[0].path} alt={project.title} className="project-image" />
				<div className="position-absolute bottom-0 start-0 project-title-container">
					<Card.Title className="p-2">
						<Link to={`/projects/${project._id}`} className="project-title">
							{project.title}
						</Link>
					</Card.Title>
				</div>
			</Card>
		</div>
	);
};

export default ProjectCard;
