import React from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sample: [],
		};
		this.handler = this.handler.bind(this);
	}

	handler(){
		axios.post("http://127.0.0.1:5500/", {
			name: "Leonid"
		}).then((res) => {
			console.log(res)
			console.log(res.data)
			this.setState({sample: res.data})
		})
	}

	render() {
		const { sample } = this.state;

		return (
			<div>
				<button onClick={this.handler}>
					"add projects in database"
				</button>
				<div>
					{this.state.sample.map((sam) =>{
						return (
							<li>{sam.name_project}</li>
						)
					})}
				</div>
			</div>
		);
	}
}

export default Home;
