import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { initializeBlogs, createBlog, likeBlog } from './reducers/blogReducer';
import { setMessage } from './reducers/notificationReducer';
import { setError } from './reducers/errorReducer';
import { activeUser } from './reducers/userReducer';
import { initializeUsers } from './reducers/userListReducer';
import { initializeComments, createComment } from './reducers/commentReducer';

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
		dispatch(initializeComments());
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
	const allComments = useSelector(({ comments }) => comments);

	const blogFormRef = React.createRef();
	const newBlogForm = () => (
		<Togglable buttonLabel="Add Blog" ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	);

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

	const addComment = (commentObject) => {
		dispatch(createComment(commentObject)).catch((exception) => {
			console.log(exception);
			dispatch(setError('Adding comment unsuccessful.', 3));
		});
	};

	// const deleteBlog = async (blogObject) => {
	// 	if (window.confirm(`Remove ${blogObject.title} by ${blogObject.author}?`)) {
	// 		dispatch(removeBlog(blogObject, user.token)).catch((exception) => {
	// 			dispatch(setError('Removal unsuccessful', 3));
	// 			console.log(exception);
	// 		});
	// 	}
	// };

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
				<label className="label" style={{ margin: '10px 10px' }}>
					Username
				</label>
				<input
					id="username"
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
					className="input"
					style={{ width: '20%', margin: '5px 10px' }}
				/>
			</div>
			<div>
				<label className="label" style={{ margin: '10px 10px' }}>
					Password
				</label>
				<input
					id="password"
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
					className="input"
					style={{ width: '20%', margin: '5px 10px' }}
				/>
			</div>
			<button
				id="loginButton"
				type="submit"
				className="button is-success"
				style={{ margin: '20px 10px' }}
			>
				Login
			</button>
		</form>
	);

	return (
		<Router>
			{user === null ? (
				<div>
					<h2 className="title is-3 is-spaced" style={{ margin: '25px 10px' }}>
						Log in to application
					</h2>
					<Notification message={notification} />
					<Error error={error} />
					{loginForm()}
				</div>
			) : (
				<div>
					<nav className="navbar">
						<h2
							className="title is-3 navbar-brand"
							style={{ margin: '0', padding: '.5rem .75rem' }}
						>
							Blogs
						</h2>
						<Link to="/blogs" className="navbar-item">
							Blogs
						</Link>
						<Link to="/users" className="navbar-item">
							Users
						</Link>
					</nav>
					<Notification message={notification} />
					<Error error={error} />
					<form onSubmit={handleLogout}>
						<article className="message" style={{ marginLeft: '10px' }}>
							<div
								className="message-body"
								style={{
									display: 'flex',
									alignItems: 'center',
									padding: '10px',
								}}
							>
								{user.name} logged in {'	'}
								<button
									type="submit"
									className="button is-danger is-small"
									style={{ marginLeft: '15px' }}
								>
									Logout
								</button>
							</div>
						</article>
					</form>

					<Switch>
						<Route path="/users/:id">
							<User allUsers={allUsers} />
						</Route>
						<Route path="/blogs/:id">
							<Blog
								allBlogs={allBlogs}
								addLike={addLike}
								allComments={allComments}
								createComment={addComment}
							/>
						</Route>
						<Route path="/users">
							<h2
								className="title is-4"
								style={{ marginTop: '20px', marginLeft: '10px' }}
							>
								Users
							</h2>
							<table className="table">
								<tbody>
									<tr>
										<th>&nbsp;</th>
										<th>Blogs created</th>
									</tr>
									{allUsers.map((user) => (
										<tr key={user.id} className="user">
											<td>
												<Link to={`/users/${user.id}`}>{user.name}</Link>
											</td>
											<td className="has-text-centered">{user.blogs.length}</td>
										</tr>
									))}
								</tbody>
							</table>
						</Route>
						<Route path="/">
							{newBlogForm()}

							<table className="table">
								<tbody>
									<tr>
										<th>Blog</th>
										<th>Author</th>
									</tr>
									{allBlogs.map((blog) => (
										<tr key={blog.id}>
											<td>
												<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
											</td>
											<td>{blog.author}</td>
										</tr>
									))}
								</tbody>
							</table>
						</Route>
					</Switch>
				</div>
			)}
		</Router>
	);
};

export default App;
