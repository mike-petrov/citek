import React from 'react';

import { authSocialAccount } from '../Functions/api';


class Callback extends React.Component {
	componentWillMount() {
		const { onRedirect } = this.props;

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
				Авторизация
			</div>
		);
	}
}

export default Callback;
