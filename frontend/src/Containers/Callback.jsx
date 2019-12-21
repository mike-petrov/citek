import React from 'react';

import { authSocialAccount } from '../../func/methods';
import Loader from '../../Components/Loader/Loader.jsx';


class Callback extends React.Component {
	componentWillMount() {
		const { user, onRedirect } = this.props;

		if (user.id === undefined || (user.id !== undefined && user.id === 0)) {
			onRedirect('/');
		}

		const code = document.location.search.split('&')[0].split('=')[1];

		if (code === undefined) {
			onRedirect('/');
		}

		this.onSocial(code);
	}

	onSocial(type, code) {
		const { onRedirect, onUpdateUserProperties } = this.props;
		authSocialAccount(this, { code }).then((_e) => {
			onUpdateUserProperties(_e);
			onRedirect(localStorage.getItem('previousPath'));
		});
	}

	render() {
		return (
			<div className="module">
				<Loader />
			</div>
		);
	}
}

export default Callback;
