import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, addLike, deleteBlog, username }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const [details, setDetails] = useState(false);

	const hideDetails = { display: details ? 'none' : '' };
	const showDetails = { display: details ? '' : 'none' };
	const showDelete = {
		display:
			blog.user !== undefined && blog.user.username === username ? '' : 'none',
	};

	const toggleDetails = () => setDetails(!details);

	const likeBlog = (likedBlog) => {
		addLike({
			title: likedBlog.title,
			author: likedBlog.author,
			url: likedBlog.url,
			likes: likedBlog.likes + 1,
			id: likedBlog.id,
		});
	};

	const removeBlog = (blogToRemove) => {
		deleteBlog(blogToRemove);
	};

	return (
		<div style={blogStyle}>
			<div style={hideDetails} className="hideDetails">
				{blog.title} {blog.author} <button onClick={toggleDetails}>View</button>
			</div>
			<div style={showDetails} className="showDetails">
				{blog.title} {blog.author} <button onClick={toggleDetails}>Hide</button>
				<br />
				{blog.url}
				<br />
				{blog.likes}{' '}
				<button onClick={() => likeBlog(blog)} className="like">
					Like
				</button>
				<br />
				{blog.user === undefined ? '' : blog.user.name}
				<br />
				<div style={showDelete}>
					<button onClick={() => removeBlog(blog)}>Remove</button>
				</div>
			</div>
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	deleteBlog: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
};

export default Blog;
