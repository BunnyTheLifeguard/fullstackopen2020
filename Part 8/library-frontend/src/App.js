import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { ALL_AUTHORS, ALL_BOOKS } from './components/queries';

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null;
	}
	return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [page, setPage] = useState('authors');

	const authors = useQuery(ALL_AUTHORS);
	const books = useQuery(ALL_BOOKS);

	if (authors.loading || books.loading) {
		return <div>Loading...</div>;
	}

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => setErrorMessage(null), 10000);
	};

	return (
		<div>
			<div>
				<Notify errorMessage={errorMessage} />
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
			</div>

			<Authors show={page === 'authors'} authors={authors.data.allAuthors} />

			<Books show={page === 'books'} books={books.data.allBooks} />

			<NewBook show={page === 'add'} setError={notify} />
		</div>
	);
};

export default App;
