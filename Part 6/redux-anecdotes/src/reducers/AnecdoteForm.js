import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createMsg, clearMsg } from '../reducers/NotificationReducer';

const NewAnecdote = (props) => {
	const dispatch = useDispatch();

	const addNew = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';
		dispatch(createAnecdote(content));
		dispatch(createMsg(content));
		setTimeout(() => {
			dispatch(clearMsg());
		}, 5000);
	};

	return (
		<form onSubmit={addNew}>
			<h2>create new</h2>
			<div>
				<input name="anecdote" />
			</div>
			<button type="submit">create</button>
		</form>
	);
};

export default NewAnecdote;
