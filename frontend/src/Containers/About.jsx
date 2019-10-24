import React from 'react';
import Nikita from '../Images/Nikita.jpg'
import Anastasiia from '../Images/Anastasiia.jpg'
import Leonid from '../Images/Leonid.jpg'
import Mikhail from '../Images/Mikhail.jpg'
import Denis from '../Images/Denis.jpg'
import { relative } from 'path';
// import { Link } from 'react-router-dom';

import './About.css';

class DeveloperInfo extends React.Component {
	render() {
		return(
			<div>
				<div className="about_info_block">
					<img src={this.props.photo}/>
					<div className="about_info_text">
						{this.props.text}
					</div>
				</div>
				<div className="about_name">{this.props.name}</div>
				<div className="about_name">{this.props.lastname}</div>
				
			</div>
		)
	}
}

class About extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	developers: [
		// 		{name: 'Князев Никита', photo: '../Images/Nikita.jpg'},
		// 		{name: 'Тырышкина Анастасия', photo: '../Images/Anastasiia.jpg'},
		// 		{name: 'Романычев Леонид', photo: '../Images/Leonid.jpg'},
		// 		{name: 'Петров Михаил', photo: '../Images/Mikhail.jpg'},
		// 		{name: 'Ковалев Денис', photo: '../Images/Denis.jpg'}
		// 	  ],
		// };
		// this.handler = this.handler.bind(this);
	}

	render() {
		// const { sample } = this.state;

		const text_n = (
			<div>
				<p>Студент 3 курса СПбГУ, <br></br>
				   факультет ПМ-ПУ, <br></br>
				   331 группа</p> 
				<p>Роль: TeamLead & Designer</p>
			</div>
			)
		const text_a = (
			<div>
				<p>Студент 3 курса СПбГУ, <br></br>
					факультет ПМ-ПУ, <br></br>
					331 группа</p> 
				<p>Роль: Software tester</p>
			</div>
			)
		const text_l = (
			<div>
				<p>Студент 3 курса СПбГУ, <br></br>
					факультет ПМ-ПУ, <br></br>
					333 группа</p> 
				<p>Роль: Back-end</p>
			</div>
			)
		const text_m = (
			<div>
				<p>Студент 3 курса СПбГУ, <br></br>
					факультет ПМ-ПУ, <br></br>
					331 группа</p> 
				<p>Роль: Front-end & Adviser</p>
			</div>
			)
		const text_d = (
			<div>
				<p>Студент 3 курса СПбГУ, <br></br>
					факультет ПМ-ПУ, <br></br>
					332 группа</p> 
				<p>Роль: Front-end</p>
			</div>
			)

		return (
			<div className="content">
				<div className="title">Команда разработчиков</div>
				<DeveloperInfo name="Князев" lastname="Никита" photo={Nikita} text={text_n} />
				<DeveloperInfo name="Тырышкина" lastname=" Анастасия" photo={Anastasiia} text={text_a} />
				<DeveloperInfo name="Романычев" lastname=" Леонид" photo={Leonid} text={text_l} />
				<DeveloperInfo name="Петров" lastname=" Михаил" photo={Mikhail} text={text_m} />
				<DeveloperInfo name="Ковалев" lastname=" Денис" photo={Denis} text={text_d} />
			</div>
		);

	}
}

export default About;
