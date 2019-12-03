import React from 'react';
import {
	BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import Home from './Containers/Home.jsx';
import Popup from './Containers/Popup.jsx';
import Projects from './Containers/Projects.jsx';
import Project from './Containers/Project.jsx';
import Employers from './Containers/Employers.jsx';
import About from './Containers/About.jsx';
import Profile from './Containers/Profile.jsx';

import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';

import { authUser, regUser } from './Functions/api';


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			showPopup: { active: false, current: null },
			redirect: { status: false, path: '/' },
			links: [
				{ name: 'Главная', link: '/' },
				{ name: 'Проекты', link: '/projects' },
				{ name: 'Работодатели', link: '/employers' },
				{ name: 'О нас', link: '/about' },
				{ name: 'Профиль', link: '/profile' },
			],
		};
		this.onPopup = this.onPopup.bind(this);
		this.onRedirect = this.onRedirect.bind(this);
		this.onAuth = this.onAuth.bind(this);
		this.onReg = this.onReg.bind(this);
		this.handlerExit = this.handlerExit.bind(this);
	}

	componentWillMount() {
		const { user } = this.state;
		// Определение пользователя
		if (localStorage.getItem('user') !== null) {
			this.setState({ user: JSON.parse(localStorage.getItem('user')) });
		} else {
			localStorage.setItem('user', JSON.stringify(user));
		}
	}

	onHide = () => {
		document.getElementById('checkbox').checked = false;
	};

	onPopup(_active, _current) {
		this.setState({ showPopup: { active: _active, current: _current } });
	}

	onRedirect(_path) {
		this.setState({ redirect: { status: true, path: _path } });
	}

	onAuth(_event, user) {
		authUser(user).then((res) => {
			if (res.error === 'login') {
				document.getElementById('auth_login').style.background = '#e74c3c';
				document.getElementById('auth_password').style.background = '#cccccc50';
			} else if (res.error === 'password') {
				document.getElementById('auth_login').style.background = '#cccccc50';
				document.getElementById('auth_password').style.background = '#e74c3c';
			} else {
				document.getElementById('auth_login').style.background = '#cccccc50';
				document.getElementById('auth_password').style.background = '#cccccc50';
				this.setState({ user: res });
				localStorage.setItem('user', JSON.stringify(res));
			}
        });
		_event.preventDefault();
	}

	onReg(_event, user) {
		regUser(user).then((res) => {
			if (res.error === 'mail') {
				document.getElementById('reg_mail').style.background = '#e74c3c';
			} else {
				document.getElementById('reg_mail').style.background = '#cccccc50';
				this.setState({ user: res });
				localStorage.setItem('user', JSON.stringify(res));
			}
        });
		_event.preventDefault();
	}

	handlerExit() {
		this.setState({ user: {} });
		localStorage.setItem('user', JSON.stringify({}));
	}

	render() {
		const {
			showPopup, redirect, links, user, onHide,
		} = this.state;
		return (
			<BrowserRouter>
				<div className="module">
					{showPopup.active && (
						<Popup
							showPopup={showPopup}
							onPopup={this.onPopup}
							onRedirect={this.onRedirect}
						/>
					)}
					<Header links={links} onHide={this.onHide} />
					<Switch>
						{redirect.status === true && (
							<>
								<Redirect to={redirect.path} />
								{this.setState({ redirect: { status: false, path: redirect.path } })}
							</>
						)}
						<Route exact path="/">
							<Home
								onPopup={this.onPopup}
								onRedirect={this.onRedirect}
							/>
						</Route>
						<Route exact path="/projects">
							<Projects
								user={user}
								onPopup={this.onPopup}
								onRedirect={this.onRedirect}
							/>
						</Route>
						<Route exact path="/project/:projectId">
							<Project
								user={user}
								onPopup={this.onPopup}
								onRedirect={this.onRedirect}
							/>
						</Route>
						<Route exact path="/employers">
							<Employers
								onPopup={this.onPopup}
								onRedirect={this.onRedirect}
							/>
						</Route>
						<Route exact path="/about">
							<About
								onPopup={this.onPopup}
								onRedirect={this.onRedirect}
							/>
						</Route>
						<Route exact path="/profile">
							<Profile
								user={user}
								onPopup={this.onPopup}
								onRedirect={this.onRedirect}
								handlerExit={this.handlerExit}
								onAuth={this.onAuth}
								onReg={this.onReg}
							/>
						</Route>
					</Switch>
				</div>
				<Footer />
			</BrowserRouter>
		);
	}
}
