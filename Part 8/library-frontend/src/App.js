import React, { useState } from 'react';
import { useQuery, useApolloClient, useSubscription } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommended from './components/Recommended';
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './components/queries';

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

	const updateCacheWith = (addedBook) => {
		const includedIn = (set, object) =>
			set.map((p) => p.id).includes(object.id);

		const booksInStore = client.readQuery({ query: ALL_BOOKS });
		if (!includedIn(booksInStore.allBooks, addedBook)) {
			client.writeQuery({
				query: ALL_BOOKS,
				data: { allBooks: booksInStore.allBooks.concat(addedBook) },
			});
		}
	};

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded;
			window.alert(`${addedBook.title} by ${addedBook.author.name} added.`);
			updateCacheWith(addedBook);
		},
	});

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
				{token === null ? (
					<button onClick={() => setPage('login')}>login</button>
				) : (
					<>
						<button onClick={() => setPage('add')}>add book</button>
						<button onClick={() => setPage('favs')}>recommended</button>
						<button type="submit" onClick={logout}>
							logout
						</button>
					</>
				)}
			</div>

			<Authors
				show={page === 'authors'}
				authors={authors.data.allAuthors}
				setError={notify}
			/>

			<Books show={page === 'books'} books={books.data.allBooks} />

			<NewBook show={page === 'add'} setError={notify} />
			<Recommended
				show={page === 'favs'}
				books={books.data.allBooks}
				setError={notify}
				token={token}
			/>
			<LoginForm
				show={page === 'login'}
				setError={notify}
				setToken={setToken}
			/>
		</div>
	);
};

export default App;
