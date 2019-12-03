import React from 'react';

import Card from './Card/Card.jsx';
import './CardsList.css';


const CardsList = (props) => {
	const {
		projects, onRateProject, user
	} = props;
	return (
		<div className="card_list">
			{projects.map((item) => (
				<Card
					key={item.id}
					project={item}
					user={user}
					onRateProject={onRateProject}
				/>
			))}
		</div>
	);
};

export default CardsList;
