import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upvote } from '../reducers/anecdoteReducer';
import { voteMsg, clearMsg } from '../reducers/NotificationReducer';

const AnecdoteList = () => {
	const dispatch = useDispatch();
	const anecdotes = useSelector((state) => state.anecdotes);

	const vote = (anecdote) => {
		dispatch(upvote(anecdote.id));
		dispatch(voteMsg(anecdote.content));
		setTimeout(() => {
			dispatch(clearMsg());
		}, 5000);
	};

	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
