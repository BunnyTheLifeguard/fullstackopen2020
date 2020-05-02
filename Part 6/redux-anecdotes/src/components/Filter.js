import React from 'react';
import { useDispatch } from 'react-redux';
import { filtering } from '../reducers/FilterReducer';

const Filter = () => {
	const dispatch = useDispatch();
	const handleChange = (event) => {
		// input-field value is in variable event.target.value
		dispatch(filtering(event.target.value));
	};
	const style = {
		marginBottom: 10,
	};

	return (
		<div style={style}>
			filter <input onChange={handleChange} />
		</div>
	);
};

export default Filter;
