import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createMsg } from '../reducers/NotificationReducer';

const NewAnecdote = (props) => {
	const addNew = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';
		props.createAnecdote(content);
		props.createMsg(`You added ${content}`, 5);
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

export default connect(null, { createAnecdote, createMsg })(NewAnecdote);
