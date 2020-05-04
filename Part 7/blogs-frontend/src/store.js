import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import errorReducer from './reducers/errorReducer';

const reducer = combineReducers({
	blogs: blogReducer,
	notification: notificationReducer,
	error: errorReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
