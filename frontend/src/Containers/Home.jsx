import React from 'react';

// import Button from '../Components/UI/Button/Button.jsx';
// import Input from '../Components/UI/Input/Input.jsx';
import Loader from '../Components/UI/Loader/Loader.jsx';
import CardsList from '../Components/CardsList/CardsList.jsx';

import { getProjects, rateProject } from '../Functions/api';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: [],
		};
		this.onRateProject = this.onRateProject.bind(this);
	}

	componentWillMount() {
		getProjects().then((res) => {
			this.setState({ projects: res });
        });
	}

	onRateProject(projectId, _type) {
		const arrayOutput = {
			id: projectId,
			type: _type,
		};
		rateProject(arrayOutput).then((res) => {
			this.setState({ projects: res });
		});
	}

	render() {
		const { projects } = this.state;
		return (
			<div className="content">
				<div className="title">Главная</div>
				{ /* <Button onClick={this.handler}>
					Add projects in database
				</Button>
				<Input
					className="error"
				/> */}
				{projects.length !== 0 ? (
					<CardsList
						projects={projects}
						onRateProject={this.onRateProject}
					/>
				) : (
					<Loader />
				)}
			</div>
		);
	}
}

export default Home;
