import React from 'react';
import { connect } from 'react-redux';
import { upvote } from '../reducers/anecdoteReducer';
import { voteMsg } from '../reducers/NotificationReducer';

const AnecdoteList = (props) => {
	const anecdotes = props.anecdotes;
	const filtered =
		props.filter !== null
			? anecdotes.filter((anecdote) => anecdote.content.includes(props.filter))
			: anecdotes;

	const vote = (anecdote) => {
		props.upvote(anecdote);
		props.voteMsg(`You voted ${anecdote.content}`, 5);
	};

	return (
		<div>
			{filtered.map((anecdote) => (
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

const mapStateToProps = (state) => {
	return {
		anecdotes: state.anecdotes,
		filter: state.filter,
	};
};

const mapDispatchToProps = {
	upvote,
	voteMsg,
};

const ConnectedAnecdotes = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdotes;
