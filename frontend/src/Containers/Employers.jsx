import React from 'react';
// import { Link } from 'react-router-dom';
import Sevryukov from '../Images/sevryukov.jpg'
import Blekanov from '../Images/blekanov.jpg'
import Gorbunov from '../Images/gorbunov.jpg'

import './Employers.css';

class Employers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// sample: [],
		};
		// this.handler = this.handler.bind(this);
	}

	render() {
		// const { sample } = this.state;
		
		const text_s = (
			<div>
				<p>Старший преподаватель кафедры технологии 
				   программирования факультета ПМ-ПУ университета СПбГУ</p>
				<p>Контакты: http://ssevryukov.moikrug.ru/</p>
				<p>Тел: +7-XXX-XXX-XX-XX</p>
			</div>
		)

		const text_b = (
			<div>
				<p>Кандидат технических наук, доцент кафедры технологии программирования, <br></br>
				   заведующий кафедрой технологии программирования</p>
				<p>Контакты: http://www.apmath.spbu.ru/ru/staff/blekanov/index.html</p>
				<p>Комн. 267</p>
				<p>E-mail: i.blekanov@gmail.com</p>
			</div>
		)

		return (
			<div className="content">
				<div className="title">Работодатели</div>
					<div>
						<div className="emp_info_block">
							<div className="emp_info_photo">
								<img src={Sevryukov} class="flexible_image"/>
								<div className="emp_name">
									<p>Севрюков Сергей</p>
									<p>Юрьевич</p>
								</div>
							</div>
							<div className="emp_info_text">
								{text_s}
							</div>
						</div>
					</div>
					<div>
						<div className="emp_info_block">
							<div className="emp_info_photo">
								<img src={Blekanov} class="flexible_image"/>
								<div className="emp_name">Блеканов Иван</div>
								<div className="emp_name">Станиславович</div>
							</div>
							<div className="emp_info_text">
								{text_b}
							</div>
						</div>
					</div>
					<div>
						<div className="emp_info_block">
							<div className="emp_info_photo">
								<img src={Gorbunov} class="flexible_image"/>
								<div className="emp_name">Горбунов Владислав</div>
								<div className="emp_name">???</div>
							</div>
							<div className="emp_info_text">
								???
							</div>
						</div>
					</div>
			</div>
		);
	}
}

export default Employers;
