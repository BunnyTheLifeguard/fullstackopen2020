const notificationReducer = (
	state = 'Notifications displayed here',
	action
) => {
	switch (action.type) {
		case 'VOTE_MSG':
			return (state = `You voted '${action.notification}'`);
		case 'ADD_MSG':
			return (state = `You added '${action.notification}'`);
		case 'CLR_MSG':
			return (state = action.notification);
		default:
			return state;
	}
};

export const voteMsg = (notification) => {
	return {
		type: 'VOTE_MSG',
		notification,
	};
};

export const createMsg = (notification) => {
	return {
		type: 'ADD_MSG',
		notification,
	};
};

export const clearMsg = () => {
	return {
		type: 'CLR_MSG',
		notification: null,
	};
};

export default notificationReducer;
