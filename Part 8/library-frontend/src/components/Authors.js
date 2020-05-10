import React, { useState } from 'react';
import { EDIT_AUTHOR, ALL_AUTHORS } from './queries';
import { useMutation } from '@apollo/client';

const Authors = ({ show, authors, setError }) => {
	const [name, setName] = useState('');
	const [setBornTo, setsetBornTo] = useState('');

	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
		onError: (error) =>
			error.networkError
				? setError(error.message)
				: setError(error.graphQLErrors[0].message),
	});

	if (!show) {
		return null;
	}

	const submit = async (event) => {
		event.preventDefault();
		console.log(setBornTo);
		console.log(Number.isInteger(setBornTo));
		editAuthor({ variables: { name, setBornTo } });

		setName('');
		setsetBornTo('');
	};

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h3>Set birthyear</h3>
			<form onSubmit={submit}>
				<div>
					name
					<input
						value={name}
						onChange={({ target }) => setName(target.value)}
					/>
				</div>
				<div>
					born
					<input
						type="number"
						value={setBornTo}
						onChange={({ target }) => setsetBornTo(parseInt(target.value))}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	);
};

export default Authors;
