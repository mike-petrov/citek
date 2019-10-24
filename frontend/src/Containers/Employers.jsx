import React from 'react';
// import { Link } from 'react-router-dom';
import Sevryukov from '../Images/sevryukov.jpg'
import Blekanov from '../Images/blekanov.jpg'

import './Employers.css';

class EmployerInfo extends React.Component {
	render() {
		return(
			<div>
				<div className="emp_info_block">
					<img src={this.props.photo}/>
					<div className="emp_info_text">
						{this.props.text}
					</div>
				</div>
				<div className="emp_name">{this.props.name}</div>
				<div className="emp_name">{this.props.lastname}</div>
				
			</div>
		)
	}
}


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
				<EmployerInfo name="Севрюков Сергей" lastname="Юрьевич" photo={Sevryukov} text={text_s} />
				<EmployerInfo name="Блеканов Иван" lastname="Станиславович" photo={Blekanov} text={text_b} />
			</div>
		);
	}
}

export default Employers;
