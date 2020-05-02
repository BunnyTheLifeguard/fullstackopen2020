import React from 'react';
import NewAnecdote from './reducers/AnecdoteForm';
import AnecdoteList from './reducers/AnecdoteList';

const App = () => {
	return (
		<div>
			<h2>Anecdotes</h2>
			<AnecdoteList />
			<NewAnecdote />
		</div>
	);
};

export default App;
