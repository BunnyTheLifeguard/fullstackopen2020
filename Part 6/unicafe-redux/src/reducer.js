const initialState = {
	good: 0,
	ok: 0,
	bad: 0,
};

const counterReducer = (state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		case 'GOOD':
			const goodPlusOne = ['good', (initialState.good += 1)];
			const goodState = Object.fromEntries(
				Object.entries(state).map(([key, val]) =>
					key !== 'good' ? [key, val] : goodPlusOne
				)
			);
			return goodState;
		case 'OK':
			const okPlusOne = ['ok', (initialState.ok += 1)];
			const okState = Object.fromEntries(
				Object.entries(state).map(([key, val]) =>
					key !== 'ok' ? [key, val] : okPlusOne
				)
			);
			return okState;
		case 'BAD':
			const badPlusOne = ['bad', (initialState.bad += 1)];
			const badState = Object.fromEntries(
				Object.entries(state).map(([key, val]) =>
					key !== 'bad' ? [key, val] : badPlusOne
				)
			);
			return badState;
		case 'ZERO':
			return state;
		default:
			return state;
	}
};

export default counterReducer;
