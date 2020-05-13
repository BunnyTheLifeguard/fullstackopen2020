import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { USER } from './queries';

const Recommended = ({ show, books }) => {
	const [filter, setFilter] = useState(null);

	const user = useQuery(USER);

	useEffect(() => {
		if (user.data !== undefined && user.data.me !== null) {
			setFilter(user.data.me.favoriteGenre);
		}
	}, [user.data]);

	if (!show) {
		return null;
	}

	return (
		<div>
			<h2>recommendations</h2>
			<p>
				books in your favorite genre <strong>patterns</strong>
			</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{filter !== null &&
						books
							.filter((b) => b.genres.includes(filter))
							.map((a) => (
								<tr key={a.title}>
									<td>{a.title}</td>
									<td>{a.author.name}</td>
									<td>{a.published}</td>
								</tr>
							))}
				</tbody>
			</table>
		</div>
	);
};

export default Recommended;
