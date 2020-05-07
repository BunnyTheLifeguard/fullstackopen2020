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
				<h2
					className="title is-4"
					style={{ marginLeft: '10px', marginTop: '20px' }}
				>
					{blog.title}
				</h2>
				<a href={blog.url} style={{ margin: '0px 10px' }}>
					{blog.url}
				</a>
				<div
					style={{ display: 'flex', alignItems: 'center', margin: '10px 10px' }}
				>
					{blog.likes} Likes{' '}
					<button
						onClick={() => likeBlog(blog)}
						className="button is-success is-small"
						style={{ marginLeft: '15px' }}
					>
						Like
					</button>
				</div>
				{blog.user === undefined ? null : (
					<div style={{ marginLeft: '10px' }}>added by {blog.user.name}</div>
				)}
				<h3
					className="title is-4"
					style={{ marginLeft: '10px', marginTop: '20px' }}
				>
					Comments
				</h3>
				<form onSubmit={addComment}>
					<textarea
						id="comment"
						value={comment}
						onChange={handleCommentChange}
						className="textarea has-fixed-size"
						rows="3"
						style={{ margin: '0px 10px', minWidth: '10%', maxWidth: '50%' }}
					></textarea>
					<button
						type="submit"
						className="button is-link is-small"
						style={{ margin: '20px 10px' }}
					>
						Add Comment
					</button>
				</form>
				<ul>
					{comments === undefined
						? null
						: comments.map((c) => (
								<li key={c.id} style={{ margin: '10px 20px' }}>
									{c.comment}
								</li>
						  ))}
				</ul>
			</div>
		);
	}
};

export default Blog;
