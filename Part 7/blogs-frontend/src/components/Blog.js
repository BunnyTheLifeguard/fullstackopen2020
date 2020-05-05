import React from 'react';
import { useParams } from 'react-router-dom';

const Blog = ({ allBlogs, addLike }) => {
	const id = useParams().id;
	const blog = allBlogs.find((b) => b.id === id);

	const likeBlog = (likedBlog) => {
		addLike({
			title: likedBlog.title,
			author: likedBlog.author,
			url: likedBlog.url,
			likes: likedBlog.likes + 1,
			id: likedBlog.id,
		});
	};

	if (!blog) {
		return null;
	} else {
		return (
			<div>
				<h2>{blog.title}</h2>
				<a href={blog.url}>{blog.url}</a>
				<div>
					{blog.likes} likes{' '}
					<button onClick={() => likeBlog(blog)}>Like</button>
				</div>
				<div>added by {blog.user.name}</div>
			</div>
		);
	}
};

export default Blog;
