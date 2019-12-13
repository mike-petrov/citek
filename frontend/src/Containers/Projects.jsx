import React from 'react';

import Input from '../Components/UI/Input/Input.jsx';
import Loader from '../Components/UI/Loader/Loader.jsx';
import CardsList from '../Components/CardsList/CardsList.jsx';

import { getProjects, createProject, rateProject, getProjectsFilter } from '../Functions/api';

class Projects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePanel: 'projects',
			projects: [],
			arrayProject: {
				name: '',
				description: '',
				category: '',
				status: '',
				linkGit: '',
			},
			filterPanel: false,
		};
		this.onCreate = this.onCreate.bind(this);
		this.onRateProject = this.onRateProject.bind(this);
		this.onChangeFilterPanel = this.onChangeFilterPanel.bind(this);
		this.onFilter = this.onFilter.bind(this);
	}

	componentWillMount() {
		getProjects().then((res) => {
			this.setState({ projects: res });
        });
	}

	onFilter(_type) {
		getProjectsFilter(_type).then((res) => {
			this.setState({ projects: res });
        });
	}

	onChangePanel(_panel) {
		this.setState({ activePanel: _panel });
	}

	onChangeFilterPanel(_panel) {
		this.setState({ filterPanel: _panel });
	}

	onRateProject(projectId, _type) {
		const { onPopup } = this.props;
		if (JSON.parse(localStorage.getItem('user')).mail !== undefined) {
			const arrayOutput = {
				id: projectId,
				type: _type,
			};
			rateProject(arrayOutput).then((res) => {
				this.setState({ projects: res });
			});
			onPopup(true, 'successLike');
	    } else {
			onPopup(true, 'accessLike');
		}
	}

	onCreate(_event, project) {
		const { onPopup } = this.props;
		createProject(project).then(() => {
			onPopup(true, 'success');
			getProjects().then((res) => {
				this.setState({ projects: res });
			});
			this.onChangePanel('projects');
		});
		_event.preventDefault();
	}

	handleCreateProject(_e, _type) {
		const { arrayProject } = this.state;
		if (_type === 'name') {
			this.setState({ arrayProject: { ...arrayProject, name: _e.target.value } });
		} else if (_type === 'description') {
			this.setState({ arrayProject: { ...arrayProject, description: _e.target.value } });
		} else if (_type === 'category') {
			this.setState({ arrayProject: { ...arrayProject, category: _e.target.value } });
		} else if (_type === 'status') {
			this.setState({ arrayProject: { ...arrayProject, status: _e.target.value } });
		} else if (_type === 'linkGit') {
			this.setState({ arrayProject: { ...arrayProject, linkGit: _e.target.value } });
		}
	}

	render() {
		const { user } = this.props;
		const { projects, activePanel, arrayProject, filterPanel } = this.state;
		return (
			<div className="content">
				{activePanel === 'projects' ? (
					<>
						<div className="title title_group">
							<div>
								<span>Проекты</span>
								{!filterPanel && (
									<span id="filter" onClick={() => { this.onChangeFilterPanel(true); }}>
										<i className="fas fa-filter" />
									</span>
								)}
							</div>
							{user.login !== undefined && (
								<div onClick={() => { this.onChangePanel('create'); }}>
									<i className="fas fa-plus-circle" />
								</div>
							)}
						</div>
						{filterPanel && (
							<>
								<div className="filter title_group">
									<span>Фильтр</span>
									<div onClick={() => { this.onChangeFilterPanel(false); }}>
										<i className="fas fa-times" />
									</div>
								</div>
								<div className="filter_block_tags">
									<div onClick={() => { this.onFilter('last'); }}>Прошлогодние</div>
									<div onClick={() => { this.onFilter('current'); }}>Новые</div>
									<div onClick={() => { this.onFilter('future'); }}>Будущие</div>
								</div>
								<div className="filter">Параметры</div>
								<div className="filter_block_params">
									1
								</div>
							</>
						)}
						{projects.length !== 0 ? (
							<CardsList
								projects={projects}
								user={user}
								onRateProject={this.onRateProject}
							/>
						) : (
							<Loader />
						)}
					</>
				) : (
					<>
						<div className="title title_group">
							<span>Создать</span>
							<div onClick={() => { this.onChangePanel('projects'); }}>
								<i className="fas fa-times-circle" />
							</div>
						</div>
						<form id="create" className="form_create" onSubmit={(_event) => { this.onCreate(_event, arrayProject); }}>
							<Input
								name="name"
								type="text"
								placeholder="Название"
								value={arrayProject.name}
								onChange={(_e) => { this.handleCreateProject(_e, 'name'); }}
								required
							/>
							<Input
								name="description"
								type="text"
								placeholder="Описание"
								value={arrayProject.description}
								onChange={(_e) => { this.handleCreateProject(_e, 'description'); }}
								required
							/>
							<Input
								name="category"
								type="text"
								placeholder="Категория"
								value={arrayProject.category}
								onChange={(_e) => { this.handleCreateProject(_e, 'category'); }}
								required
							/>
							<Input
								name="status"
								type="text"
								placeholder="Статус"
								value={arrayProject.status}
								onChange={(_e) => { this.handleCreateProject(_e, 'status'); }}
								required
							/>
							<Input
								name="linkGit"
								type="text"
								placeholder="GitHub (ссылка)"
								value={arrayProject.linkGit}
								onChange={(_e) => { this.handleCreateProject(_e, 'linkGit'); }}
								required
							/>
							<Input
								className="btn"
								type="submit"
								value="Создать"
							/>
						</form>
					</>
				)}
			</div>
		);
	}
}

export default Projects;
