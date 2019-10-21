import React from 'react';

import Card from './Card/Card.jsx';
import './CardsList.css';


const CardsList = (props) => {
	const {
		cards,
	} = props;
	return (
		<div className="card_list">
			{cards.map((item) => (
				<Card
					key={item.id}
					card={item}
				/>
			))}
		</div>
	);
};

export default CardsList;
