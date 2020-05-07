import React from 'react';

const Notification = ({ message }) => {
	if (message === null) {
		return null;
	} else {
		return (
			<div className="notification is-success" style={{ margin: '10px 10px' }}>
				{message}
			</div>
		);
	}
};

const Error = ({ error }) => {
	if (error === null) {
		return null;
	} else {
		return (
			<div className="notification is-danger" style={{ margin: '10px 10px' }}>
				{error}
			</div>
		);
	}
};

export { Notification, Error };
