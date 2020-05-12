import React, { useState } from 'react';

const Books = ({ show, books }) => {
	const [filter, setFilter] = useState('all');
	if (!show) {
		return null;
	}

	const allGenres = books.map((b) => b.genres);
	const genres = [...new Set(allGenres.flat())];

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{filter === 'all'
						? books.map((a) => (
								<tr key={a.title}>
									<td>{a.title}</td>
									<td>{a.author.name}</td>
									<td>{a.published}</td>
								</tr>
						  ))
						: books
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
			<div>
				{genres.map((g) => (
					<button
						key={g}
						value={g}
						onClick={({ target }) => setFilter(target.value)}
					>
						{g}
					</button>
				))}
			</div>
		</div>
	);
};

export default Books;
