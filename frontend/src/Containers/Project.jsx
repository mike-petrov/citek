import React from 'react';

import Loader from '../Components/UI/Loader/Loader.jsx';
import { getProject } from '../Functions/api';

import './Project.css';


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
		const { onRateProject } = this.props;
		const { arrayProject } = this.state;
		console.log(arrayProject);
		return (
			<div className="content">
				<div className="title">Проект</div>
				{arrayProject.length !== 0 ? (
					<div className="project_blocks">
						<div className="project_block">
							<div className="profile_field">
								<span className="profile_field_title">Название:</span>
								<span>{arrayProject.name}</span>
							</div>
							<div className="profile_field">
								<span className="profile_field_title">О проекте:</span>
								<span>{arrayProject.description}</span>
							</div>
							<div className="profile_field">
								<span className="profile_field_title">Категория:</span>
								<span className="profile_field_category">{arrayProject.category}</span>
							</div>
							<div className="profile_field">
								<span className="profile_field_title">Статус:</span>
								<span className="profile_field_status">{arrayProject.status}</span>
							</div>
							<div className="profile_field">
								<span className="profile_field_title">GitHub: </span>
								<span><a className="link" href={arrayProject.linkGit}>Ссылка на репозиторий</a></span>
							</div>
						</div>
						<div className="project_block">
							<div className="profile_field">
								<span className="profile_field_title">Аналитика: </span>
								<div className="profile_field_diogram">
									1
								</div>
							</div>
						</div>
						<div className="project_block">
							<div className="profile_field profile_field_flex">
								<span className="profile_field_title">Оценить проект: </span>
								<div className="card_like_group">
									<span onClick={() => { onRateProject(arrayProject.id, 1); }}>
										<i className="far fa-thumbs-up" />
										{arrayProject.countLikes}
									</span>
									<span onClick={() => { onRateProject(arrayProject.id, 0); }}>
										<i className="far fa-thumbs-down" />
										{arrayProject.countDislikes}
									</span>
								</div>
							</div>
						</div>
					</div>
				) : (
					<Loader />
				)}
			</div>
		);
	}
}

export default Project;
