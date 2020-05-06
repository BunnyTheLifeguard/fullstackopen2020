import blogService from '../services/blogs';

const commentReducer = (state = [], action) => {
	switch (action.type) {
		case 'COMMENT_INIT':
			return action.comments;
		case 'COMMENT_ADD':
			return action.comments;
		default:
			return state;
	}
};

export const initializeComments = () => {
	return async (dispatch) => {
		const comments = await blogService.getComments();
		dispatch({ type: 'COMMENT_INIT', comments: comments });
	};
};

export const createComment = (comment) => {
	return async (dispatch) => {
		await blogService.createComment(comment);
		const comments = await blogService.getComments();
		dispatch({ type: 'COMMENT_ADD', comments: comments });
	};
};

export default commentReducer;
