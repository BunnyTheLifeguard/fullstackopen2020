import anecdoteService from '../services/anecdotes';

export const upvote = (anecdote) => {
	const upvoted = { ...anecdote, votes: (anecdote.votes += 1) };
	return async (dispatch) => {
		const updated = await anecdoteService.update(upvoted);
		dispatch({ type: 'VOTE', data: updated });
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch({ type: 'NEW_ANECDOTE', data: newAnecdote });
	};
};

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch({ type: 'INIT_ANECDOTES', data: anecdotes });
	};
};

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'VOTE':
			const anecdoteId = action.data.id;
			const toVote = state.find((a) => a.id === anecdoteId);
			const upvoted = { ...toVote };
			return state
				.map((a) => (a.id !== anecdoteId ? a : upvoted))
				.sort((a, b) => b.votes - a.votes);
		case 'NEW_ANECDOTE':
			return state.concat(action.data).sort((a, b) => b.votes - a.votes);
		case 'INIT_ANECDOTES':
			return action.data.sort((a, b) => b.votes - a.votes);
		default:
			return state.sort((a, b) => b.votes - a.votes);
	}
};

export default reducer;
