import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import { setMessage } from './reducers/notificationReducer';
import { setError } from './reducers/errorReducer';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import { Notification, Error } from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
	const dispatch = useDispatch();
	// const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	// const [message, setMessage] = useState(null);
	// const [error, setError] = useState(null);

	// useEffect(() => {
	// 	blogService.getAll().then((blogs) => {
	// 		setBlogs(blogs.sort((a, b) => b.likes - a.likes));
	// 	});
	// }, []);

	useEffect(() => {
		dispatch(initializeBlogs());
	}, [dispatch]);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
		}
	}, []);

	const allBlogs = useSelector(({ blogs }) => blogs);
	const notification = useSelector(({ notification }) => notification);
	const error = useSelector(({ error }) => error);

	const blogFormRef = React.createRef();

	const addBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility();
			dispatch(createBlog(blogObject, user.token));
			// await blogService.setToken(user.token);
			// await blogService.create(blogObject);

			// setMessage(
			// 	`A new blog ${blogObject.title} by ${blogObject.author} added`
			// );
			// setTimeout(() => setMessage(null), 3000);

			dispatch(
				setMessage(
					`A new blog ${blogObject.title} by ${blogObject.author} added`,
					3
				)
			);

			// const blogs = await blogService.getAll();
			// setBlogs(blogs.sort((a, b) => b.likes - a.likes));
		} catch (exception) {
			// setError('Adding blog unsuccessful: Need more data!');
			// setTimeout(() => setError(null), 3000);
			dispatch(setError('Adding blog unsuccessful: Need more data!', 3));
		}
	};

	const newBlogForm = () => (
		<Togglable buttonLabel="Add Blog" ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	);

	const addLike = async (blogObject) => {
		try {
			await blogService.update(blogObject);
			// const blogs = await blogService.getAll();
			// setBlogs(blogs.sort((a, b) => b.likes - a.likes));
		} catch (exception) {
			// setError('Like unsuccessful');
			// setTimeout(() => setError(null), 3000);
			dispatch(setError('Like unsuccessful', 3));
		}
	};

	const deleteBlog = async (blogObject) => {
		try {
			if (
				window.confirm(`Remove ${blogObject.title} by ${blogObject.author}?`)
			) {
				await blogService.setToken(user.token);
				await blogService.remove(blogObject);
				// const blogs = await blogService.getAll();
				// setBlogs(blogs.sort((a, b) => b.likes - a.likes));
			}
		} catch (exception) {
			// setError('Removal unsuccessful');
			// setTimeout(() => setError(null), 3000);
			dispatch(setError('Removal unsuccessful', 3));
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
			// setMessage(`Successful login for ${username}`);
			// setTimeout(() => {
			// 	setMessage(null);
			// }, 3000);
			dispatch(setMessage(`Successful login for ${username}`, 3));

			setUsername('');
			setPassword('');
		} catch (exception) {
			// setError('Wrong username or password');
			// setTimeout(() => {
			// 	setError(null);
			// }, 3000);
			dispatch(setError('Wrong username or password', 3));
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
					id="username"
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				Password
				<input
					id="password"
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button id="loginButton" type="submit">
				Login
			</button>
		</form>
	);

	return (
		<div>
			{user === null ? (
				<div>
					<h2>Log in to application</h2>
					<Notification message={notification} />
					<Error error={error} />
					{loginForm()}
				</div>
			) : (
				<div>
					<h2>Blogs</h2>
					<Notification message={notification} />
					<Error error={error} />
					<form onSubmit={handleLogout}>
						<p>
							{user.name} logged in
							<button type="submit">Logout</button>
						</p>
					</form>

					{newBlogForm()}

					<div className="blogList">
						{allBlogs.map((blog) => (
							<Blog
								key={blog.id}
								blog={blog}
								addLike={addLike}
								deleteBlog={deleteBlog}
								username={user !== null ? user.username : ''}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
