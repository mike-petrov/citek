import React from 'react';

import Input from '../Components/UI/Input/Input.jsx';
import Button from '../Components/UI/Button/Button.jsx';

import './Profile.css';


class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authUser: {
				login: '',
				password: '',
			},
			regUser: {
				name: '',
				login: '',
				mail: '',
				type: '',
				status: '',
				password: '',
			},
			activePanel: 'login',
		};
		this.handleAuthUser = this.handleAuthUser.bind(this);
		this.handleRegUser = this.handleRegUser.bind(this);
		this.onChangePanel = this.onChangePanel.bind(this);
	}

	onChangePanel(_panel) {
		this.setState({ activePanel: _panel });
	}

	handleAuthUser(_e, _type) {
		const { authUser } = this.state;
		if (_type === 'login') {
			this.setState({ authUser: { ...authUser, login: _e.target.value } });
		} else if (_type === 'password') {
			this.setState({ authUser: { ...authUser, password: _e.target.value } });
		}
	}

	handleRegUser(_e, _type) {
		const { regUser } = this.state;
		if (_type === 'name') {
			this.setState({ regUser: { ...regUser, name: _e.target.value } });
		} else if (_type === 'login') {
			this.setState({ regUser: { ...regUser, login: _e.target.value } });
		} else if (_type === 'mail') {
			this.setState({ regUser: { ...regUser, mail: _e.target.value } });
		} else if (_type === 'type') {
			this.setState({ regUser: { ...regUser, type: _e.target.value } });
		} else if (_type === 'password') {
			this.setState({ regUser: { ...regUser, password: _e.target.value } });
		}
	}

	render() {
		const {
			onAuth, onReg, user, handlerExit,
		} = this.props;
		const { authUser, regUser, activePanel } = this.state;
		return (
			<div className="content">
				<div className="title">Профиль</div>
				{user.login === undefined ? (
					<>
						{activePanel === 'login' ? (
							<form id="login" className="form_login" onSubmit={(_event) => { onAuth(_event, authUser); }}>
								<div className="title">Авторизация</div>
								<Input
									id="auth_login"
									name="login"
									type="text"
									placeholder="Логин"
									value={authUser.login}
									onChange={(_e) => { this.handleAuthUser(_e, 'login'); }}
									required
								/>
								<Input
									id="auth_password"
									name="password"
									type="text"
									placeholder="Пароль"
									value={authUser.password}
									onChange={(_e) => { this.handleAuthUser(_e, 'password'); }}
									required
								/>
								<Input
									className="btn"
									type="submit"
									value="Войти"
								/>
								<div className="subtitle" onClick={() => { this.onChangePanel('registration'); }}>Регистрация</div>
							</form>
						) : (
							<form id="registration" className="form_login" onSubmit={(_event) => { onReg(_event, regUser); }}>
								<div className="title">Регистрация</div>
								<Input
									name="name"
									type="text"
									placeholder="Имя"
									value={regUser.name}
									onChange={(_e) => { this.handleRegUser(_e, 'name'); }}
									required
								/>
								<Input
									name="login"
									type="text"
									placeholder="Логин"
									value={regUser.login}
									onChange={(_e) => { this.handleRegUser(_e, 'login'); }}
									required
								/>
								<Input
									id="reg_mail"
									name="mail"
									type="text"
									placeholder="E-mail"
									value={regUser.mail}
									onChange={(_e) => { this.handleRegUser(_e, 'mail'); }}
									required
								/>
								<Input
									name="password"
									type="text"
									placeholder="Пароль"
									value={regUser.password}
									onChange={(_e) => { this.handleRegUser(_e, 'password'); }}
									required
								/>
								<Input
									className="btn"
									type="submit"
									value="Зарегистрироваться"
								/>
								<div className="subtitle" onClick={() => { this.onChangePanel('login'); }}>Авторизация</div>
							</form>
						)}
					</>
				) : (
					<>
						<div className="profile_block">
							<div className="profile_field">
								<span className="profile_field_title">Id:</span>
								<span>{user._id}</span>
							</div>
							<div className="profile_field">
								<span className="profile_field_title">Имя:</span>
								<span>{user.name}</span>
							</div>
							<div className="profile_field">
								<span className="profile_field_title">Логин:</span>
								<span>{user.login}</span>
							</div>
							<div className="profile_field">
								<span className="profile_field_title">Почта:</span>
								<span>{user.mail}</span>
							</div>
						</div>
						<div className="profile_block">
							<Button onClick={handlerExit}>
								Выйти
							</Button>
						</div>
					</>
				)}
			</div>
		);
	}
}

export default Profile;
