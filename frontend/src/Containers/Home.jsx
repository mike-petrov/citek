import React from 'react';
import axios from 'axios';

import Button from '../Components/UI/Button/Button.jsx';
import Input from '../Components/UI/Input/Input.jsx';
import CardsList from '../Components/CardsList/CardsList.jsx';


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sample: [],
			cards: [
				{
					id: '1',
					name: 'citic',
					category: 'web',
					status: 'in progress',
					description: 'BlaBlaBlaBlaBlaBla',
					countLikes: 1,
					countDislikes: 2,
				},
			],
		};
		this.handler = this.handler.bind(this);
	}

	handler() {
		// axios.post('http://127.0.0.1:5500/', {
		// 	name: 'Leonid',
		// }).then((res) => {
		// 	console.log(res);
		// 	console.log(res.data);
		// 	this.setState({ sample: res.data });
		// });
	}

	render() {
		const { sample, cards } = this.state;
		return (
			<div className="content">
				<div className="title">Главная</div>
				{ /* <Button onClick={this.handler}>
					Add projects in database
				</Button>
				<Input
					className="error"
				/> */}
				<CardsList
					cards={cards}
				/>
				<div>
					{sample.map((item) => (
						<li>{item.name_project}</li>
					))}
				</div>
			</div>
		);
	}
}

export default Home;
