import React from 'react';
import {
	BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import Home from './Components/Home.jsx';
import Popup from './Components/Popup.jsx';

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
				<Switch>
					{redirect.status === true && (
						<>
							<Redirect to={redirect.path} />
							{this.setState({ redirect: { status: false, path: redirect.path } })}
						</>
					)}
					<Route exact path="/">
						<Home
							showPopup={showPopup}
							onPopup={this.onPopup}
							onRedirect={this.onRedirect}
						/>
					</Route>
				</Switch>
			</BrowserRouter>
		);
	}
}
