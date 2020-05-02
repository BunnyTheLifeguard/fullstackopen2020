const filterReducer = (state = null, action) => {
	switch (action.type) {
		case 'FILTER':
			return (state = action.filter);
		default:
			return state;
	}
};

export const filtering = (filter) => {
	return {
		type: 'FILTER',
		filter,
	};
};

export default filterReducer;
