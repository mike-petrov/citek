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
		});
	}

	onRateProject(projectId, _type) {
		const arrayOutput = {
			id: projectId,
			type: _type,
		};
		rateProject(arrayOutput).then((res) => {
			getProject(arrayOutput).then((res) => {
				this.setState({ arrayProject: res });
			});
		});
	}

	render() {
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
									<CircularProgressbar
										value={'60'}
										text={`${'60'}%`}
										circleRatio={0.75}
										styles={buildStyles({
											rotation: 1 / 2 + 1 / 8,
											strokeLinecap: "butt",
											trailColor: "#eee"
										})}
								    />
								</div>
							</div>
						</div>
						<div className="project_block_group">
							<div className="project_block">
								<div className="profile_field">
									<span className="profile_field_title">Статистика: </span>
									<div className="profile_field_diogram">
									<Radar
										width={300}
										height={300}
										padding={50}
										domainMax={10}
										highlighted={null}
										data={{
											variables: [
												{ key: '1', label: '1' },
												{ key: '2', label: '2' },
												{ key: '3', label: '3' },
												{ key: '4', label: '4' },
												{ key: '5', label: '5' },
												{ key: '6', label: '6' },
											],
											sets: [
												{
													key: 'me',
													label: 'My Scores',
													values: {
														[1]: 4,
														[2]: 2,
														[3]: 7,
														[4]: 2,
														[5]: 3,
														[6]: 5,
													},
												},
											],
										}}
									/>
									</div>
								</div>
							</div>
							<div className="project_block">
								<div className="profile_field">
									<span className="profile_field_title">Технологии: </span>
									<div className="profile_field_diogram">
									<BubbleChart
										graph={{
											zoom: 0.5,
											offsetX: 0.05,
											offsetY: 0.05,
										}}
										width={500}
										height={400}
										showLegend={false}
										data={[
											{ label: 'JavaScript', value: 1 },
											{ label: 'Python', value: 3 },
											{ label: 'PHP', value: 6 },
										]}
									/>
									</div>
								</div>
							</div>
						</div>
						<div className="project_block">
							<div className="profile_field profile_field_flex">
								<span className="profile_field_title">Оценить проект: </span>
								<div className="card_like_group">
									<span onClick={() => { this.onRateProject(arrayProject._id, 1); }}>
										<i className="far fa-thumbs-up" />
										{arrayProject.countLikes}
									</span>
									<span onClick={() => { this.onRateProject(arrayProject._id, 0); }}>
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
