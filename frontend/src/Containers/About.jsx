import React from 'react';
import Nikita from '../Images/Nikita.jpg'
import Anastasiia from '../Images/Anastasiia.jpg'
import Leonid from '../Images/Leonid.jpg'
import Mikhail from '../Images/Mikhail.jpg'
import Denis from '../Images/Denis.jpg'
import { relative } from 'path';
// import { Link } from 'react-router-dom';

import './About.css';

class About extends React.Component {
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
				<div>
					<div className="about_info_block">
						<div className="about_info_photo">
							<img src={Nikita} className="flexible_image"/>
							<div className="about_name">
								<p>Князев</p>
								<p>Никита</p>
							</div>
						</div>
						<div className="about_info_text">
							{text_n}
						</div>
					</div>
				</div>
				<div>
					<div className="about_info_block">
						<div className="about_info_photo">
							<img src={Anastasiia} className="flexible_image"/>
							<div className="about_name">
								<p>Тырышкина</p>
								<p>Анастасия</p>
					</div>
						</div>
						<div className="about_info_text">
							{text_a}
						</div>
					</div>
				</div>
				<div>
					<div className="about_info_block">
						<div className="about_info_photo">
							<img src={Leonid} className="flexible_image"/>
							<div className="about_name">
								<p>Романычев</p>
								<p>Леонид</p>
					</div>
						</div>
						<div className="about_info_text">
							{text_l}
						</div>
					</div>
				</div>
				<div>
					<div className="about_info_block">
						<div className="about_info_photo">
							<img src={Mikhail} className="flexible_image"/>
							<div className="about_name">
								<p>Петров</p>
								<p>Михаил</p>
					</div>
						</div>
						<div className="about_info_text">
							{text_m}
						</div>
					</div>
				</div>
				<div>
					<div className="about_info_block">
						<div className="about_info_photo">
							<img src={Denis} className="flexible_image"/>
							<div className="about_name">
								<p>Ковалёв</p>
								<p>Денис</p>
					</div>
						</div>
						<div className="about_info_text">
							{text_d}
						</div>
					</div>
				</div>
			</div>
		);

	}
}

export default About;
