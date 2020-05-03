const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case 'VOTE_MSG':
			return (state = action.notification);
		case 'ADD_MSG':
			return (state = action.notification);
		case 'CLR_MSG':
			return (state = action.clear);
		default:
			return state;
	}
};

export const voteMsg = (notification, timer) => {
	return async (dispatch) => {
		await dispatch({ type: 'VOTE_MSG', notification });
		const clear = null;
		setTimeout(() => {
			dispatch({ type: 'CLR_MSG', clear });
		}, timer * 1000);
	};
};

export const createMsg = (notification, timer) => {
	return async (dispatch) => {
		await dispatch({ type: 'ADD_MSG', notification });
		const clear = null;
		setTimeout(() => {
			dispatch({ type: 'CLR_MSG', clear });
		}, timer * 1000);
	};
};

export default notificationReducer;
