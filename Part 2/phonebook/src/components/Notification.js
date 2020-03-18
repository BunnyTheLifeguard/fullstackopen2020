import React from 'react';

const Notification = ({ message }) => {
	const messageStyle = {
		color: 'green',
		fontSize: 20,
		backgroundColor: 'gainsboro',
		border: 'green',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '10px'
	};

	if (message === null) {
		return null;
	} else {
		return <div style={messageStyle}>{message}</div>;
	}
};

const Error = ({ error }) => {
	const errorStyle = {
		color: 'red',
		fontSize: 20,
		backgroundColor: 'gainsboro',
		border: 'red',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '10px'
	};

	if (error === null) {
		return null;
	} else {
		return <div style={errorStyle}>{error}</div>;
	}
};

export { Notification, Error };
