import React from 'react';
import { useParams } from 'react-router-dom';

const User = ({ allUsers }) => {
	const id = useParams().id;
	const user = allUsers.find((u) => u.id === id);
	if (!user) {
		return null;
	} else {
		return (
			<div>
				<h2>{user.name}</h2>
				<h3>added blogs</h3>
				<ul>
					{user.blogs.map((blog) => (
						<li key={blog.id}>{blog.title}</li>
					))}
				</ul>
			</div>
		);
	}
};

export default User;
