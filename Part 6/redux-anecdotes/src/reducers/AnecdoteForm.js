import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const NewAnecdote = (props) => {
	const dispatch = useDispatch();

	const addNew = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';
		dispatch(createAnecdote(content));
	};

	return (
		<form onSubmit={addNew}>
			<div>
				<input name="anecdote" />
			</div>
			<button type="submit">create</button>
		</form>
	);
};

export default NewAnecdote;
