import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState();

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
		}
	}, []);

	const addBlog = async (event) => {
		event.preventDefault();
		const newBlog = { title: title, author: author, url: url };

		try {
			blogService.setToken(user.token);
			await blogService.create(newBlog);
			setTitle('');
			setAuthor('');
			setUrl('');
			blogService.getAll().then((blogs) => setBlogs(blogs));
		} catch (exception) {
			console.log(exception);
		}
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			console.log('Wrong credentials');
			console.log(exception);
		}
	};

	const handleLogout = async (event) => {
		event.preventDefault();
		try {
			await window.localStorage.removeItem('loggedBlogAppUser');
			setUser(null);
		} catch (exception) {
			console.log(exception);
		}
	};

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				Username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				Password
				<input
					type="text"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">Login</button>
		</form>
	);

	return (
		<div>
			{user === null ? (
				<div>
					<h2>Log in to application</h2>
					{loginForm()}
				</div>
			) : (
				<div>
					<h2>Blogs</h2>
					<form onSubmit={handleLogout}>
						<p>
							{user.name} logged in
							<button type="submit">Logout</button>
						</p>
					</form>
					<h2>Create new</h2>
					<form onSubmit={addBlog}>
						<div>
							Title:
							<input
								type="text"
								value={title}
								name="title"
								onChange={({ target }) => setTitle(target.value)}
							/>
						</div>
						<div>
							Author:
							<input
								type="text"
								value={author}
								name="author"
								onChange={({ target }) => setAuthor(target.value)}
							/>
						</div>
						<div>
							Url:
							<input
								type="text"
								value={url}
								name="url"
								onChange={({ target }) => setUrl(target.value)}
							/>
						</div>
						<button type="submit">Create</button>
					</form>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
