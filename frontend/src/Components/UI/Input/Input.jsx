import React from 'react';
import './Input.css';

const Input = (props) => {
    const {
        onClick, onChange, disabled, className, required,
    } = props;
    return (
	<input
		onClick={onClick}
		onChange={onChange}
		className={className}
		disabled={disabled}
		required={required}
	/>
    );
};

export default Input;
