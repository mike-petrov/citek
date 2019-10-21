import React from 'react';
import './Button.css';

const Button = (props) => {
    const {
        onClick, disabled, children,
    } = props;
    return (
	<button
		onClick={onClick}
		className="btn"
		disabled={disabled}
		type="submit"
	>
		{children}
	</button>
    );
};

export default Button;
