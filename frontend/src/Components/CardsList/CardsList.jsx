import React from 'react';

import Card from './Card/Card.jsx';
import './CardsList.css';


const CardsList = (props) => {
	const {
		cards, onRateCard,
	} = props;
	return (
		<div className="card_list">
			{cards.map((item) => (
				<Card
					key={item.id}
					card={item}
					onRateCard={onRateCard}
				/>
			))}
		</div>
	);
};

export default CardsList;
