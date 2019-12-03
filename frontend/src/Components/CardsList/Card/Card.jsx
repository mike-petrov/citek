import React from 'react';
import { Link } from 'react-router-dom';

import './Card.css';


const Card = (props) => {
	const {
		project, onRateProject, user,
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
						{project.likes.indexOf(user.mail) === -1 ? (
							<span onClick={() => { onRateProject(project.id, 1); }}>
								<i className="far fa-thumbs-up" />
								{project.likes.length}
							</span>
						) : (
							<span style={{ background: '#aa3f1f', color: '#fff' }}>
								<i className="far fa-thumbs-up" />
								{project.likes.length}
							</span>
						)}
						{project.dislikes.indexOf(user.mail) === -1 ? (
							<span onClick={() => { onRateProject(project.id, 0); }}>
								<i className="far fa-thumbs-down" />
								{project.dislikes.length}
							</span>
						) : (
							<span style={{ background: '#aa3f1f', color: '#fff' }}>
								<i className="far fa-thumbs-down" />
								{project.dislikes.length}
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
