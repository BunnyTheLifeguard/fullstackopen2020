import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import contactsService from './services/contacts';
import { Notification, Error } from './components/Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [showAll, setShowAll] = useState('');
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		contactsService.getAll().then((initialPhonebook) => {
			setPersons(initialPhonebook);
		});
	}, []);

	const nameChange = (event) => {
		setNewName(event.target.value);
	};

	const numberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const filter = (event) => setShowAll(event.target.value);

	const visibleNumbers =
		showAll === ''
			? persons
			: persons.filter((pers) =>
					pers.name.toUpperCase().includes(showAll.toUpperCase())
			  );

	const addName = (event) => {
		event.preventDefault();
		const names = persons.map((item) => item.name);
		const numbers = persons.map((item) => item.number);

		if (names.includes(newName)) {
			if (
				window.confirm(
					`${newName} is already in phonebook, replace the old number with the new one?`
				)
			) {
				const [updatePerson] = persons.filter((p) => p.name === newName);
				updatePerson.number = newNumber;
				contactsService
					.update(updatePerson.id, updatePerson)
					.then((updatePerson) => {
						setPersons(persons);
						setNewName('');
						setNewNumber('');
						setMessage(`Changed number of ${updatePerson.name}`);
						setTimeout(() => {
							setMessage(null);
						}, 2500);
					})
					.catch(() => {
						setError(
							`Information of ${updatePerson.name} has already been removed from server `
						);
						setTimeout(() => {
							setError(null);
						}, 2500);
						setPersons(persons.filter((p) => p.id !== updatePerson.id));
						setNewName('');
						setNewNumber('');
					});
			}
		} else if (numbers.includes(newNumber)) {
			alert(`${newNumber} is already in phonebook`);
		} else {
			const newPerson = { name: newName, number: newNumber };

			contactsService.create(newPerson).then((newContact) => {
				setPersons(persons.concat(newContact));
				setNewName('');
				setNewNumber('');
				setMessage(`Added ${newPerson.name}`);
				setTimeout(() => {
					setMessage(null);
				}, 2500);
			});
		}
	};

	const removeContact = (id, event) => {
		event.preventDefault();
		const deletePerson = persons.filter((p) => p.id === id)[0].name;
		if (window.confirm(`Delete ${deletePerson} ?`)) {
			contactsService.remove(id);
			setPersons(persons.filter((p) => p.id !== id));
			setMessage(`Deleted ${deletePerson}`);
			setTimeout(() => {
				setMessage(null);
			}, 2500);
		} else {
			return null;
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<Error error={error} />
			<Filter filter={filter} />
			<h3>add a new</h3>
			<PersonForm
				addName={addName}
				newName={newName}
				nameChange={nameChange}
				newNumber={newNumber}
				numberChange={numberChange}
			/>
			<h3>Numbers</h3>
			<Persons condition={visibleNumbers} removeContact={removeContact} />
		</div>
	);
};

export default App;
