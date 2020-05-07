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
				<h2
					className="title is-4"
					style={{ marginLeft: '10px', marginTop: '20px' }}
				>
					{user.name}
				</h2>
				<h3 className="title is-6" style={{ marginLeft: '10px' }}>
					Added Blogs:
				</h3>
				<ul>
					{user.blogs.map((blog) => (
						<li key={blog.id} style={{ margin: '10px 10px' }}>
							{blog.title}
						</li>
					))}
				</ul>
			</div>
		);
	}
};

export default User;
