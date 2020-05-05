const userReducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_USER':
			return action.activeUser;
		default:
			return state;
	}
};

export const activeUser = (user) => {
	return async (dispatch) => {
		dispatch({ type: 'SET_USER', activeUser: user });
	};
};

export default userReducer;
