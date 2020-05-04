import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
	switch (action.type) {
		case 'INITIALIZE':
			return action.data;
		case 'ADD':
			return action.data;
		case 'LIKE':
			return action.data;
		case 'REMOVE':
			return state;
		default:
			return state;
	}
};

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		const sorted = blogs.sort((a, b) => b.likes - a.likes);
		dispatch({
			type: 'INITIALIZE',
			data: sorted,
		});
	};
};

export const createBlog = (blog, token) => {
	return async (dispatch) => {
		await blogService.setToken(token);
		await blogService.create(blog);
		const blogs = await blogService.getAll();
		const sorted = blogs.sort((a, b) => b.likes - a.likes);
		dispatch({
			type: 'ADD',
			data: sorted,
		});
	};
};

export const likeBlog = (blog) => {
	return async (dispatch) => {
		await blogService.update(blog);
		const blogs = await blogService.getAll();
		const sorted = blogs.sort((a, b) => b.likes - a.likes);
		dispatch({ type: 'LIKE', data: sorted });
	};
};

export default blogReducer;
