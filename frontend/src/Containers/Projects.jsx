import React from 'react';

import Input from '../Components/UI/Input/Input.jsx';
import Loader from '../Components/UI/Loader/Loader.jsx';
import CardsList from '../Components/CardsList/CardsList.jsx';

import { getProjects, createProject } from '../Functions/api';

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
		};
		this.onCreate = this.onCreate.bind(this);
	}

	componentWillMount() {
		getProjects().then((res) => {
			this.setState({ projects: res });
        });
	}

	onChanePanel(_panel) {
		this.setState({ activePanel: _panel });
	}

	onCreate(_event, project) {
		const { onPopup } = this.props;
		createProject(project).then(() => {
			onPopup(true, 'success');
			getProjects().then((res) => {
				this.setState({ projects: res });
			});
			this.onChanePanel('projects');
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
		const { onRateProject } = this.props;
		const { projects, activePanel, arrayProject } = this.state;
		return (
			<div className="content">
				{activePanel === 'projects' ? (
					<>
						<div className="title title_group">
							<span>Проекты</span>
							<div onClick={() => { this.onChanePanel('create'); }}>
								<i className="fas fa-plus-circle" />
							</div>
						</div>
						{projects.length !== 0 ? (
							<CardsList
								projects={projects}
								onRateProject={onRateProject}
							/>
						) : (
							<Loader />
						)}
					</>
				) : (
					<>
						<div className="title title_group">
							<span>Создать</span>
							<div onClick={() => { this.onChanePanel('projects'); }}>
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
