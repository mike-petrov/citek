import React from 'react';

import Button from '../Components/UI/Button/Button.jsx';
import Input from '../Components/UI/Input/Input.jsx';
import Loader from '../Components/UI/Loader/Loader.jsx';
import CardsList from '../Components/CardsList/CardsList.jsx';

import { getCards, rateCard } from '../Functions/api';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [],
		};
		this.onRateCard = this.onRateCard.bind(this);
	}

	componentWillMount() {
		getCards().then((res) => {
			this.setState({ cards: res });
        });
	}

	onRateCard(cardId) {
		rateCard(cardId, 1).then((res) => {
			this.setState({ cards: res });
		});
	}

	render() {
		const { cards } = this.state;
		return (
			<div className="content">
				<div className="title">Главная</div>
				{ /* <Button onClick={this.handler}>
					Add projects in database
				</Button>
				<Input
					className="error"
				/> */}
				{cards.length !== 0 ? (
					<CardsList
						cards={cards}
						onRateCard={this.onRateCard}
					/>
				) : (
					<Loader />
				)}
			</div>
		);
	}
}

export default Home;
