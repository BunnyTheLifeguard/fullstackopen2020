import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import errorReducer from './reducers/errorReducer';
import userReducer from './reducers/userReducer';
import userListReducer from './reducers/userListReducer';
import commentReducer from './reducers/commentReducer';

const reducer = combineReducers({
	blogs: blogReducer,
	notification: notificationReducer,
	error: errorReducer,
	activeUser: userReducer,
	users: userListReducer,
	comments: commentReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
