import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = (props) => {
	const {
		links, onHide,
	} = props;
	return (
		<div className="header">
			<div className="header_content">
				{links.map((item) => (
					<Link to={item.link} key={item.link}>{item.name}</Link>
				))}
			</div>
			<div className="header_content_mobile">
				<div className="header_brand">CITEK</div>
				<nav className="mobile-menu">
                        <input type="checkbox" id="checkbox" className="mobile-menu__checkbox" />
                        <label htmlFor="checkbox" className="mobile-menu__btn">
                            <div className="mobile-menu__icon"></div>
                        </label>
                        <div className="mobile-menu__container">
                            <ul className="mobile-menu__list">
								{links.map((item) => (
	                                <li className="mobile-menu__item gradient gradient_gold" key={item.link}>
										<Link to={item.link} onClick={() => { onHide(); }}>
											{item.name}
										</Link>
									</li>
								))}
                            </ul>
                        </div>
                    </nav>
			</div>
		</div>
	);
};

export default Header;
