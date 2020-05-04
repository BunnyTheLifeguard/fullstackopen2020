const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case 'MESSAGE':
			return action.notification;
		case 'CLEAR_MSG':
			return action.notification;
		default:
			return state;
	}
};

let msgTimer = 0;

export const setMessage = (notification, timer) => {
	return async (dispatch) => {
		await dispatch({ type: 'MESSAGE', notification });
		if (msgTimer === 0) {
			msgTimer = setTimeout(() => {
				dispatch({ type: 'CLEAR_MSG', notification: null });
			}, timer * 1000);
		} else {
			await clearTimeout(msgTimer);
			msgTimer = setTimeout(() => {
				dispatch({ type: 'CLEAR_MSG', notification: null });
			}, timer * 1000);
		}
	};
};

export default notificationReducer;
