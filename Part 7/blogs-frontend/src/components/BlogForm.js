import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const handleTitleChange = (event) => setTitle(event.target.value);
	const handleAuthorChange = (event) => setAuthor(event.target.value);
	const handleUrlChange = (event) => setUrl(event.target.value);

	const addBlog = (event) => {
		event.preventDefault();
		createBlog({
			title: title,
			author: author,
			url: url,
		});

		setTitle('');
		setAuthor('');
		setUrl('');
	};

	return (
		<div>
			<h2
				className="title is-4"
				style={{ marginTop: '20px', marginLeft: '10px' }}
			>
				Create new
			</h2>

			<form onSubmit={addBlog}>
				<div>
					<label className="label" style={{ margin: '0 10px' }}>
						Title
					</label>
					<input
						id="title"
						value={title}
						onChange={handleTitleChange}
						className="input"
						style={{ width: '20%', margin: '5px 10px' }}
					/>
				</div>
				<div>
					<label className="label" style={{ margin: '0 10px' }}>
						Author
					</label>
					<input
						id="author"
						value={author}
						onChange={handleAuthorChange}
						className="input"
						style={{ width: '20%', margin: '5px 10px' }}
					/>
				</div>
				<div>
					<label className="label" style={{ margin: '0 10px' }}>
						Url
					</label>
					<input
						id="url"
						value={url}
						onChange={handleUrlChange}
						className="input"
						style={{ width: '20%', margin: '5px 10px' }}
					/>
				</div>
				<button
					id="saveBlog"
					type="submit"
					className="button is-link is-small"
					style={{ margin: '5px 10px' }}
				>
					Add Blog
				</button>
			</form>
		</div>
	);
};

export default BlogForm;
