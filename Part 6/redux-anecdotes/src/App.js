import React from 'react';
import NewAnecdote from './reducers/AnecdoteForm';
import AnecdoteList from './reducers/AnecdoteList';
import Notification from './components/Notification';

const App = () => {
	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<AnecdoteList />
			<NewAnecdote />
		</div>
	);
};

export default App;
