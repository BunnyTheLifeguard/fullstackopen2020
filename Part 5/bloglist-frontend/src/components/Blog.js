import React, { useState } from 'react';

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
			<div style={hideDetails}>
				{blog.title} {blog.author} <button onClick={toggleDetails}>View</button>
			</div>
			<div style={showDetails}>
				{blog.title} {blog.author} <button onClick={toggleDetails}>Hide</button>
				<br />
				{blog.url}
				<br />
				{blog.likes} <button onClick={() => likeBlog(blog)}>Like</button>
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

export default Blog;
