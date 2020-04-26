import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import { Notification, Error } from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => {
			setBlogs(blogs.sort((a, b) => b.likes - a.likes));
		});
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
		}
	}, []);

	const addBlog = async (blogObject) => {
		try {
			blogService.setToken(user.token);
			await blogService.create(blogObject);

			setMessage(
				`A new blog ${blogObject.title} by ${blogObject.author} added`
			);
			setTimeout(() => {
				setMessage(null);
			}, 3000);
			blogService
				.getAll()
				.then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
		} catch (exception) {
			setError('Adding blog unsuccessful: Need more data!');
			setTimeout(() => {
				setError(null);
			}, 3000);
		}
	};

	const newBlogForm = () => (
		<Togglable buttonLabel="Add Blog">
			<BlogForm createBlog={addBlog} />
		</Togglable>
	);

	const addLike = async (blogObject) => {
		try {
			await blogService.update(blogObject);
			blogService
				.getAll()
				.then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
		} catch (exception) {
			setError('Like unsuccessful');
			setTimeout(() => {
				setError(null);
			}, 3000);
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

					{newBlogForm()}

					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} addLike={addLike} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
