import React from 'react';

const BlogForm = ({
	handleSubmit,
	handleTitleChange,
	handleAuthorChange,
	handleUrlChange,
	title,
	author,
	url,
}) => {
	return (
		<div>
			<h2>Create new</h2>

			<form onSubmit={handleSubmit}>
				<div>
					Title
					<input value={title} onChange={handleTitleChange} />
				</div>
				<div>
					Author
					<input value={author} onChange={handleAuthorChange} />
				</div>
				<div>
					Url
					<input value={url} onChange={handleUrlChange} />
				</div>
				<button type="submit">Add blog</button>
			</form>
		</div>
	);
};

export default BlogForm;
