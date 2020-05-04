const errorReducer = (state = null, action) => {
	switch (action.type) {
		case 'ERROR':
			return action.error;
		case 'CLEAR_ERR':
			return action.error;
		default:
			return state;
	}
};

let errTimer = 0;

export const setError = (error, timer) => {
	return async (dispatch) => {
		await dispatch({ type: 'ERROR', error });
		if (errTimer === 0) {
			errTimer = setTimeout(() => {
				dispatch({ type: 'CLEAR_ERR', error: null });
			}, timer * 1000);
		} else {
			await clearTimeout(errTimer);
			errTimer = setTimeout(() => {
				dispatch({ type: 'CLEAR_ERR', error: null });
			}, timer * 1000);
		}
	};
};

export default errorReducer;
