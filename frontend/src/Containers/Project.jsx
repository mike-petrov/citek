import React from 'react';

import Loader from '../Components/UI/Loader/Loader.jsx';
import { getProject } from '../Functions/api';


class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			arrayProject: [],
		};
	}

	componentWillMount() {
		const projectId = Number(document.location.pathname.split('/').pop());
		const arrayOutput = {
			id: projectId,
		};
		getProject(arrayOutput).then((res) => {
			this.setState({ arrayProject: res });
		});
	}

	render() {
		const { arrayProject } = this.state;
		return (
			<div className="content">
				<div className="title">Проект</div>
				{arrayProject.length !== 0 ? (
					<div className="profile_block">
						<div className="profile_field">{`Категория: ${arrayProject.category}`}</div>
						<div className="profile_field">{`Дизлайки: ${arrayProject.countDislikes}`}</div>
						<div className="profile_field">{`Лайки: ${arrayProject.countLikes}`}</div>
						<div className="profile_field">{`Описание: ${arrayProject.description}`}</div>
						<div className="profile_field">{`GitHub: ${arrayProject.linkGit}`}</div>
						<div className="profile_field">{`Имя: ${arrayProject.name}`}</div>
						<div className="profile_field">{`Статутс: ${arrayProject.status}`}</div>
					</div>
				) : (
					<Loader />
				)}
			</div>
		);
	}
}

export default Project;
