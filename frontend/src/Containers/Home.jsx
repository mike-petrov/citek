import React from 'react';
// import { Link } from 'react-router-dom';

import Logo from '../Images/logo.png'
import './Home.css';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// sample: [],
		};
		// this.handler = this.handler.bind(this);
	}

	render() {
		// const { sample } = this.state;
		return (
			<div className="content">
				<div className="title">Главная</div>
				<div className="home_info_block">
					<div className="home_info_text">
						<p>Данный проект дает возможность студентам <br></br>
				  		самореализоваться и попробовать свои силы в<br></br>
						выполнении реальных задач. CITEK сотрудничает со<br></br>
						многими компаниями и работодателями, которые<br></br>
						заинтересованы в компетентных студентах</p>
					</div>
					<div className="home_info_photo">
						<img src={Logo} class="flexible_image"/>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
