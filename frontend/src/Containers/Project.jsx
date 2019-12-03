import React from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import BubbleChart from '@weknow/react-bubble-chart-d3';

import Radar from 'react-d3-radar';

import Loader from '../Components/UI/Loader/Loader.jsx';
import { getProject, rateProject } from '../Functions/api';

import './Project.css';


class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			arrayProject: [],
			dataLanguages: [],
		};
		this.onRateProject = this.onRateProject.bind(this);
	}

	componentWillMount() {
		const projectId = Number(document.location.pathname.split('/').pop());
		const arrayOutput = {
			id: projectId,
		};
		getProject(arrayOutput).then((res) => {
			this.setState({ arrayProject: res });

			// { label: 'JavaScript', value: 1 }
			const keys = Object.keys(res.github.languages);
			const values = Object.values(res.github.languages);
			const dataLanguages = [];
			for (let i = 0; i < keys.length; i += 1) {
				let array = {
					label: keys[i],
					value: values[i]
				}
				dataLanguages.push(array);
			}
			this.setState({ dataLanguages });
		});
	}

	onRateProject(projectId, _type) {
		const { onPopup } = this.props;
		if (JSON.parse(localStorage.getItem('user')).mail !== undefined) {
			const arrayOutput = {
				id: projectId,
				type: _type,
			};
			rateProject(arrayOutput).then((res) => {
				getProject(arrayOutput).then((res) => {
					this.setState({ arrayProject: res });
				});
			});
			onPopup(true, 'successLike');
		} else {
			onPopup(true, 'accessLike');
		}
	}

	render() {
		const { user } = this.props;
		const { arrayProject, dataLanguages } = this.state;
		return (
			<div className="content">
				<div className="title">Проект</div>
				{arrayProject.length !== 0 ? (
					<div className="project_blocks">
						<div className="project_block">
							<div className="project_field">
								<span className="project_field_title">Название:</span>
								<span>{arrayProject.name}</span>
							</div>
							<div className="project_field">
								<span className="project_field_title">О проекте:</span>
								<span>{arrayProject.description}</span>
							</div>
							<div className="project_field">
								<span className="project_field_title">Категория:</span>
								<span className="project_field_category">{arrayProject.category}</span>
							</div>
							<div className="project_field">
								<span className="project_field_title">Статус:</span>
								<span className="project_field_status">{arrayProject.status}</span>
							</div>
							<div className="project_field">
								<span className="project_field_title">GitHub: </span>
								<span><a className="link" href={arrayProject.linkGit}>Ссылка на репозиторий</a></span>
							</div>
						</div>
						<div className="project_block">
							<div className="project_field">
								<span className="project_field_title">Аналитика: </span>
									<div className="project_field_diogram">
										{arrayProject.github.languages.message === undefined ? (
											<CircularProgressbar
												value={Math.floor((arrayProject.github.issues.closed / (arrayProject.github.issues.closed + arrayProject.github.issues.open)) * 100)}
												text={`${Math.floor((arrayProject.github.issues.closed / (arrayProject.github.issues.closed + arrayProject.github.issues.open)) * 100)}%`}
												circleRatio={0.75}
												styles={buildStyles({
													rotation: 1 / 2 + 1 / 8,
													strokeLinecap: "butt",
													trailColor: "#eee"
												})}
										    />
										) : (
											<div>Слишком много запросов</div>
										)}
								</div>
							</div>
						</div>
						<div className="project_block_group">
							<div className="project_block">
								<div className="project_field">
									<span className="project_field_title">Статистика: </span>
									<div className="project_field_diogram">
										{arrayProject.github.languages.message === undefined ? (
											<Radar
												width={300}
												height={300}
												padding={50}
												domainMax={15}
												highlighted={null}
												data={{
													variables: [
														{ key: 'assignees', label: 'assignees' },
														{ key: 'milestones', label: 'milestones' },
														{ key: 'labels', label: 'labels' },
														{ key: 'releases', label: 'releases' },
														{ key: 'downloads', label: 'downloads' },
														{ key: 'branches', label: 'branches' },
													],
													sets: [
														{
															key: 'me',
															label: 'My Scores',
															values: {
																assignees: arrayProject.github.statistics.assignees,
																milestones: arrayProject.github.statistics.milestones,
																labels: arrayProject.github.statistics.labels,
																releases: arrayProject.github.statistics.releases,
																downloads: arrayProject.github.statistics.downloads,
																branches: arrayProject.github.statistics.branches,
															},
														},
													],
												}}
											/>
										) : (
											<div>-</div>
										)}
									</div>
								</div>
							</div>
							<div className="project_block">
								<div className="project_field">
									<span className="project_field_title">Технологии: </span>
									<div className="project_field_diogram">
										{arrayProject.github.languages.message === undefined ? (
											<BubbleChart
												graph={{
													zoom: 0.5,
													offsetX: 0.05,
													offsetY: 0.05,
												}}
												width={500}
												height={400}
												showLegend={false}
												data={dataLanguages}
											/>
										) : (
											<div>-</div>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="project_block">
							<div className="project_field project_field_flex">
								<span className="project_field_title">Оценить проект: </span>
								<div className="card_like_group">
									{arrayProject.likes.indexOf(user.mail) === -1 ? (
										<span onClick={() => { this.onRateProject(arrayProject._id, 1); }}>
											<i className="far fa-thumbs-up" />
											{arrayProject.likes.length}
										</span>
									) : (
										<span style={{ background: '#aa3f1f', color: '#fff' }}>
											<i className="far fa-thumbs-up" />
											{arrayProject.likes.length}
										</span>
									)}
									{arrayProject.dislikes.indexOf(user.mail) === -1 ? (
										<span onClick={() => { this.onRateProject(arrayProject._id, 0); }}>
											<i className="far fa-thumbs-down" />
											{arrayProject.dislikes.length}
										</span>
									) : (
										<span style={{ background: '#aa3f1f', color: '#fff' }}>
											<i className="far fa-thumbs-down" />
											{arrayProject.dislikes.length}
										</span>
									)}
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
