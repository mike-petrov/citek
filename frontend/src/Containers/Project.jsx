import React from 'react';
// import { Link } from 'react-router-dom';

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
		getProject(projectId).then((res) => {
			this.setState({ arrayProject: res });
		});
	}

	render() {
		const { arrayProject } = this.state;
		return (
			<div className="content">
				<div className="title">Проект</div>
				{console.log(arrayProject)}
			</div>
		);
	}
}

export default Project;
