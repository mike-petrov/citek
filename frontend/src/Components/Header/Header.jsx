import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = (props) => {
	const {
		links,
	} = props;
	return (
		<div className="header">
			<div className="header_content">
				{links.map((item) => (
					<Link to={item.link} key={item.link}>{item.name}</Link>
				))}
			</div>
		</div>
	);
};

export default Header;
