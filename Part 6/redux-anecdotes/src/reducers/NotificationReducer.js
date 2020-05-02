const notificationReducer = (
	state = 'Notifications displayed here',
	action
) => {
	switch (action.type) {
		case 'SET_MSG':
			return (state = `You voted '${action.notification}'`);
		default:
			return state;
	}
};

export const voteMsg = (notification) => {
	return {
		type: 'SET_MSG',
		notification,
	};
};

export default notificationReducer;
