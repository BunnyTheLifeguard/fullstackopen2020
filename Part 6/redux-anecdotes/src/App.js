import React, { useEffect } from 'react';
import NewAnecdote from './reducers/AnecdoteForm';
import AnecdoteList from './reducers/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import anecdoteService from './services/anecdotes';
import { initializeAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		anecdoteService
			.getAll()
			.then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)));
	}, [dispatch]);

	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<Filter />
			<AnecdoteList />
			<NewAnecdote />
		</div>
	);
};

export default App;
