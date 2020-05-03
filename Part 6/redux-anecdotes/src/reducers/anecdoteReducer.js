import anecdoteService from '../services/anecdotes';

export const upvote = (id) => {
	return {
		type: 'VOTE',
		data: { id },
	};
};

export const createAnecdote = (data) => {
	return {
		type: 'NEW_ANECDOTE',
		data,
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
			const upvoted = { ...toVote, votes: (toVote.votes += 1) };
			return state
				.map((a) => (a.id !== anecdoteId ? a : upvoted))
				.sort((a, b) => b.votes - a.votes);
		case 'NEW_ANECDOTE':
			return state.concat(action.data).sort((a, b) => b.votes - a.votes);
		case 'INIT_ANECDOTES':
			return action.data;
		default:
			return state.sort((a, b) => b.votes - a.votes);
	}
};

export default reducer;
