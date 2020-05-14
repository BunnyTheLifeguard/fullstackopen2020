import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { USER, GENRE } from './queries';

const Recommended = ({ show, token }) => {
	const [genre, setGenre] = useState(null);

	const [user, userResult] = useLazyQuery(USER);
	const [getBooks, booksResult] = useLazyQuery(GENRE);

	useEffect(() => {
		if (token) {
			user();
			if (userResult.data && userResult.data.me !== null) {
				setGenre(userResult.data.me.favoriteGenre);
				if (genre) {
					getBooks({ variables: { genre } });
				}
			}
		}
	}, [booksResult.data, genre, getBooks, token, user, userResult.data]);

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
					{booksResult.data &&
						booksResult.data.allBooks.map((a) => (
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
