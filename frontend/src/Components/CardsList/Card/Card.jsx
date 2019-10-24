import React from 'react';
import { Link } from 'react-router-dom';

import './Card.css';


const Card = (props) => {
	const {
		project, onRateProject,
	} = props;
	return (
		<div className="card">
			<div className="card_wrapper">
				<div className="card_header">
					<div className="card_category">{project.category}</div>
					<div className="card_status">{project.status}</div>
				</div>
				<div className="card_content">
					<div className="card_title">{project.name}</div>
					<div className="card_text">{project.description}</div>
				</div>
				<div className="card_footer">
					<Link to={`/project/${project.id}`} className="btn">Подробнее</Link>
					<div className="card_like_group">
						<span onClick={() => { onRateProject(project.id, 1); }}>
							<i className="far fa-thumbs-up" />
							{project.countLikes}
						</span>
						<span onClick={() => { onRateProject(project.id, 0); }}>
							<i className="far fa-thumbs-down" />
							{project.countDislikes}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
