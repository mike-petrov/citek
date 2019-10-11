import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sample: 'Hi',
		};
		this.handler = this.handler.bind(this);
	}

	handler(){
		axios.post("http://127.0.0.1:5500/", {
			name: "Leonid"
		}).then((res) => {
			this.setState({sample: res.data.name})
		})
	}

	render() {
		const { sample } = this.state;
		return (
			<div>
				{sample}
				<button onClick={this.handler}>
					"tap me"
				</button>
			</div>
		);
	}
}

export default Home;
