import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Blog = ({ allBlogs, addLike, allComments, createComment }) => {
	const [comment, setComment] = useState('');

	const id = useParams().id;
	const blog = allBlogs.find((b) => b.id === id);
	const comments = allComments.filter(({ blogId }) => blogId === id);

	const handleCommentChange = (event) => setComment(event.target.value);

	const likeBlog = (likedBlog) => {
		addLike({
			title: likedBlog.title,
			author: likedBlog.author,
			url: likedBlog.url,
			likes: likedBlog.likes + 1,
			id: likedBlog.id,
		});
	};

	const addComment = (event) => {
		event.preventDefault();
		createComment({
			comment: comment,
			blogId: id,
		});
		setComment('');
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
				{blog.user === undefined ? null : <div>added by {blog.user.name}</div>}
				<h3>comments</h3>
				<form onSubmit={addComment}>
					<input id="comment" value={comment} onChange={handleCommentChange} />
					<button type="submit">add comment</button>
				</form>
				<ul>
					{comments === undefined
						? null
						: comments.map((c) => <li key={c.id}>{c.comment}</li>)}
				</ul>
			</div>
		);
	}
};

export default Blog;
