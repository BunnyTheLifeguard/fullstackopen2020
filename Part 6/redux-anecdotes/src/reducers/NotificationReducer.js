const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case 'VOTE_MSG':
			return (state = action.notification);
		case 'ADD_MSG':
			return (state = action.notification);
		case 'CLR_MSG':
			return (state = action.notification);
		default:
			return state;
	}
};

let voteTimer = 0;

export const voteMsg = (notification, timer) => {
	return async (dispatch) => {
		await dispatch({ type: 'VOTE_MSG', notification });
		if (voteTimer === 0) {
			voteTimer = setTimeout(() => {
				dispatch({ type: 'CLR_MSG', notification: null });
			}, timer * 1000);
		} else {
			await clearTimeout(voteTimer);
			voteTimer = setTimeout(() => {
				dispatch({ type: 'CLR_MSG', notification: null });
			}, timer * 1000);
		}
	};
};

let addTimer = 0;

export const createMsg = (notification, timer) => {
	return async (dispatch) => {
		await dispatch({ type: 'ADD_MSG', notification });
		if (addTimer === 0) {
			addTimer = setTimeout(() => {
				dispatch({ type: 'CLR_MSG', notification: null });
			}, timer * 1000);
		} else {
			await clearTimeout(addTimer);
			addTimer = setTimeout(() => {
				dispatch({ type: 'CLR_MSG', notification: null });
			}, timer * 1000);
		}
	};
};

export default notificationReducer;
