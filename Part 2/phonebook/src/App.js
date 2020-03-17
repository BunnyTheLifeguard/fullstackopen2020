import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import contactsService from './services/contacts';

const App = () => {
	const [persons, setPersons] = useState([]);

	useEffect(() => {
		contactsService.getAll().then((initialPhonebook) => {
			setPersons(initialPhonebook);
		});
	}, []);

	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [showAll, setShowAll] = useState('');

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
					.then((updated) => updated);
				setPersons(persons);
				setNewName('');
				setNewNumber('');
			}
		} else if (numbers.includes(newNumber)) {
			alert(`${newNumber} is already in phonebook`);
		} else {
			const newPerson = { name: newName, number: newNumber };

			contactsService.create(newPerson).then((newContact) => {
				setPersons(persons.concat(newContact));
				setNewName('');
				setNewNumber('');
			});
		}
	};

	const nameChange = (event) => {
		setNewName(event.target.value);
	};

	const numberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const filter = (event) => setShowAll(event.target.value);

	const removeContact = (id, event) => {
		event.preventDefault();
		if (
			window.confirm(`Delete ${persons.filter((p) => p.id === id)[0].name} ?`)
		) {
			contactsService.remove(id);
			setPersons(persons.filter((p) => p.id !== id));
		} else {
			return null;
		}
	};

	const visibleNumbers =
		showAll === ''
			? persons
			: persons.filter((pers) =>
					pers.name.toUpperCase().includes(showAll.toUpperCase())
			  );

	return (
		<div>
			<h2>Phonebook</h2>
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
