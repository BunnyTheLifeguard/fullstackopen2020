import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => setVisible(!visible);

	useImperativeHandle(ref, () => {
		return { toggleVisibility };
	});

	return (
		<div>
			<div style={hideWhenVisible}>
				<button
					onClick={toggleVisibility}
					className="button is-link is-small"
					style={{ margin: '20px 10px' }}
				>
					{props.buttonLabel}
				</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button
					onClick={toggleVisibility}
					className="button is-danger is-small"
					style={{ margin: '5px 10px' }}
				>
					Cancel
				</button>
			</div>
		</div>
	);
});

Togglable.propTypes = { buttonLabel: PropTypes.string.isRequired };
Togglable.displayName = 'Togglable';

export default Togglable;
