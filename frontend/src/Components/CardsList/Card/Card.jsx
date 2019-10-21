import React from 'react';
import { Link } from 'react-router-dom';

import './Card.css';

const Card = (props) => {
	const {
		card,
	} = props;
	return (
		<div className="card">
			<div className="card_wrapper">
				<div className="card_header">
					<div className="card_category">{card.category}</div>
					<div className="card_status">{card.status}</div>
				</div>
				<div className="card_content">
					<div className="card_title">{card.name}</div>
					<div className="card_text">{card.description}</div>
				</div>
				<div className="card_footer">
					<Link to={`/project/${card.id}`} className="btn">Подробнее</Link>
					<div className="card_like_group">
						<span>
							<i className="far fa-thumbs-up" />
							{card.countLikes}
						</span>
						<span>
							<i className="far fa-thumbs-down" />
							{card.countDislikes}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
