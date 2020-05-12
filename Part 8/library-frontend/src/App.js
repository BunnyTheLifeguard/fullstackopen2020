import React, { useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { ALL_AUTHORS, ALL_BOOKS } from './components/queries';

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null;
	}
	return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

const App = () => {
	const [token, setToken] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [page, setPage] = useState('authors');

	const authors = useQuery(ALL_AUTHORS);
	const books = useQuery(ALL_BOOKS);

	const client = useApolloClient();

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

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
				{token === null ? (
					<button onClick={() => setPage('login')}>login</button>
				) : (
					<button type="submit" onClick={logout}>
						logout
					</button>
				)}
			</div>

			<Authors
				show={page === 'authors'}
				authors={authors.data.allAuthors}
				setError={notify}
			/>

			<Books show={page === 'books'} books={books.data.allBooks} />

			<NewBook show={page === 'add'} setError={notify} />
			<LoginForm
				show={page === 'login'}
				setError={notify}
				setToken={setToken}
			/>
		</div>
	);
};

export default App;
