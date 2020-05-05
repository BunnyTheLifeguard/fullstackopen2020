import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
	initializeBlogs,
	createBlog,
	likeBlog,
	removeBlog,
} from './reducers/blogReducer';
import { setMessage } from './reducers/notificationReducer';
import { setError } from './reducers/errorReducer';
import { activeUser } from './reducers/userReducer';
import { initializeUsers } from './reducers/userListReducer';

import Bloglist from './components/Bloglist';
import { Notification, Error } from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import User from './components/User';
import Blog from './components/Blog';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		dispatch(initializeBlogs());
		dispatch(initializeUsers());
	}, [dispatch]);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			dispatch(activeUser(user));
		}
	}, [dispatch]);

	const allBlogs = useSelector(({ blogs }) => blogs);
	const notification = useSelector(({ notification }) => notification);
	const error = useSelector(({ error }) => error);
	const user = useSelector(({ activeUser }) => activeUser);
	const allUsers = useSelector(({ users }) => users);

	const blogFormRef = React.createRef();
	const newBlogForm = () => (
		<Togglable buttonLabel="Add Blog" ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility();
		dispatch(createBlog(blogObject, user.token))
			.then((response) => {
				dispatch(
					setMessage(
						`A new blog ${blogObject.title} by ${blogObject.author} added`,
						3
					)
				);
				console.log(response.data);
			})
			.catch((exception) => {
				console.log(exception);
				dispatch(setError('Adding blog unsuccessful: Need more data!', 3));
			});
	};

	const addLike = (blogObject) => {
		dispatch(likeBlog(blogObject)).catch((exception) => {
			console.log(exception);
			dispatch(setError('Like unsuccessful', 3));
		});
	};

	const deleteBlog = async (blogObject) => {
		if (window.confirm(`Remove ${blogObject.title} by ${blogObject.author}?`)) {
			dispatch(removeBlog(blogObject, user.token)).catch((exception) => {
				dispatch(setError('Removal unsuccessful', 3));
				console.log(exception);
			});
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
			dispatch(activeUser(user));
			dispatch(setMessage(`Successful login for ${username}`, 3));
			setUsername('');
			setPassword('');
		} catch (exception) {
			dispatch(setError('Wrong username or password', 3));
			setUsername('');
			setPassword('');
		}
	};

	const handleLogout = async (event) => {
		event.preventDefault();
		try {
			window.localStorage.removeItem('loggedBlogAppUser');
			dispatch(activeUser(null));
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
		<Router>
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
						<p>{user.name} logged in</p>
						<button type="submit">Logout</button>
					</form>

					<Switch>
						<Route path="/users/:id">
							<User allUsers={allUsers} />
						</Route>
						<Route path="/blogs/:id">
							<Blog allBlogs={allBlogs} addLike={addLike} />
						</Route>
						<Route path="/users">
							<h2>Users</h2>
							<table>
								<tbody>
									<tr>
										<td>&nbsp;</td>
										<td>
											<strong>blogs created</strong>
										</td>
									</tr>
									{allUsers.map((user) => (
										<tr key={user.id} className="user">
											<td>
												<Link to={`/users/${user.id}`}>{user.name}</Link>
											</td>
											<td>{user.blogs.length}</td>
										</tr>
									))}
								</tbody>
							</table>
						</Route>
						<Route path="/">
							{newBlogForm()}

							<ul
								className="blogList"
								style={{ listStyleType: 'none', paddingLeft: 0 }}
							>
								{allBlogs.map((blog) => (
									<li key={blog.id} style={blogStyle}>
										<Link to={`/blogs/${blog.id}`}>
											{blog.title} {blog.author}
										</Link>
									</li>
								))}
							</ul>
						</Route>
					</Switch>
				</div>
			)}
		</Router>
	);
};

export default App;
