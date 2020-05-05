import userService from '../services/users';

const userListReducer = (state = [], action) => {
	switch (action.type) {
		case 'USER_INIT':
			return action.users;
		default:
			return state;
	}
};

export const initializeUsers = () => {
	return async (dispatch) => {
		const users = await userService.getAll();
		dispatch({ type: 'USER_INIT', users: users });
	};
};

export default userListReducer;
