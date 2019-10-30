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
	}

	onPopup(_active, _current) {
		this.setState({ showPopup: { active: _active, current: _current } });
	}

	onRedirect(_path) {
		this.setState({ redirect: { status: true, path: _path } });
	}

	onAuth(_event, user) {
		authUser(user).then((res) => {
			console.log(res);
			this.setState({ user: res });
        });
		_event.preventDefault();
	}

	onReg(_event, user) {
		regUser(user).then((res) => {
			console.log(res);
			this.setState({ user: res });
        });
		_event.preventDefault();
	}

	render() {
		const {
			showPopup, redirect, links, user,
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
					<Header links={links} />
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
								onPopup={this.onPopup}
								onRedirect={this.onRedirect}
							/>
						</Route>
						<Route exact path="/project/:projectId">
							<Project
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
