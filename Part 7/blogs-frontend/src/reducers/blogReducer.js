import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
	switch (action.type) {
		case 'BLOG_INIT':
			return action.data;
		case 'BLOG_ADD':
			return action.data;
		case 'BLOG_LIKE':
			return action.data;
		case 'BLOG_REMOVE':
			return action.data;
		default:
			return state;
	}
};

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		const sorted = blogs.sort((a, b) => b.likes - a.likes);
		dispatch({ type: 'BLOG_INIT', data: sorted });
	};
};

export const createBlog = (blog, token) => {
	return async (dispatch) => {
		await blogService.setToken(token);
		await blogService.create(blog);
		const blogs = await blogService.getAll();
		const sorted = blogs.sort((a, b) => b.likes - a.likes);
		dispatch({ type: 'BLOG_ADD', data: sorted });
	};
};

export const likeBlog = (blog) => {
	return async (dispatch) => {
		await blogService.update(blog);
		const blogs = await blogService.getAll();
		const sorted = blogs.sort((a, b) => b.likes - a.likes);
		dispatch({ type: 'BLOG_LIKE', data: sorted });
	};
};

export const removeBlog = (blog, token) => {
	return async (dispatch) => {
		await blogService.setToken(token);
		await blogService.remove(blog);
		const blogs = await blogService.getAll();
		const sorted = blogs.sort((a, b) => b.likes - a.likes);
		dispatch({ type: 'BLOG_REMOVE', data: sorted });
	};
};

export default blogReducer;
