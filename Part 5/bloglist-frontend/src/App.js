import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import { Notification, Error } from './components/Notification';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState();
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);

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

			setMessage(`A new blog ${title} by ${author} added`);
			setTimeout(() => {
				setMessage(null);
			}, 3000);
			setTitle('');
			setAuthor('');
			setUrl('');
			blogService.getAll().then((blogs) => setBlogs(blogs));
		} catch (exception) {
			setError('Adding blog unsuccessful: Need more data!');
			setTimeout(() => {
				setError(null);
			}, 3000);
			setTitle('');
			setAuthor('');
			setUrl('');
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
			setMessage(`Successful login for ${username}`);
			setTimeout(() => {
				setMessage(null);
			}, 3000);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setError('Wrong username or password');
			setTimeout(() => {
				setError(null);
			}, 2500);
			setUsername('');
			setPassword('');
		}
	};

	const handleLogout = async (event) => {
		event.preventDefault();
		try {
			window.localStorage.removeItem('loggedBlogAppUser');
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
					type="password"
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
					<Notification message={message} />
					<Error error={error} />
					{loginForm()}
				</div>
			) : (
				<div>
					<h2>Blogs</h2>
					<Notification message={message} />
					<Error error={error} />
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
