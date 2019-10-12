import React from 'react';
import {
	BrowserRouter, Route, Switch, Redirect, Link,
} from 'react-router-dom';

import Home from './Components/Home.jsx';
import Popup from './Components/Popup.jsx';
import Projects from './Components/Projects.jsx';
import Employers from './Components/Employers.jsx';
import About from './Components/About.jsx';
import Profile from './Components/Profile.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopup: { active: false, current: null },
			redirect: { status: false, path: '/' },
		};
		this.onPopup = this.onPopup.bind(this);
		this.onRedirect = this.onRedirect.bind(this);
	}

	componentWillMount() {
		// Hi
	}

	onPopup(_active, _current) {
		this.setState({ showPopup: { active: _active, current: _current } });
	}

	onRedirect(_path) {
		this.setState({ redirect: { status: true, path: _path } });
	}

	render() {
		const {
			showPopup, redirect,
		} = this.state;
		return (
			<BrowserRouter>
				{showPopup.active && (
					<Popup
						showPopup={showPopup}
						onPopup={this.onPopup}
						onRedirect={this.onRedirect}
					/>
				)}
				<div className="header">
					<div className="header_content">
						<Link to="/">Главная</Link>
						<Link to="/projects">Проекты</Link>
						<Link to="/employers">Работодатели</Link>
						<Link to="/about">О нас</Link>
						<Link to="/profile">Профиль</Link>
					</div>
				</div>
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
							onPopup={this.onPopup}
							onRedirect={this.onRedirect}
						/>
					</Route>
				</Switch>
			</BrowserRouter>
		);
	}
}
