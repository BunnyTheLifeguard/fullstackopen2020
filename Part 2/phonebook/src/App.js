import React, { useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]);

	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [showAll, setShowAll] = useState('');

	const addName = (event) => {
		event.preventDefault();
		const names = persons.map((item) => item.name);
		const numbers = persons.map((item) => item.number);

		if (names.includes(newName)) {
			alert(`${newName} is already in phonebook`);
		} else if (numbers.includes(newNumber)) {
			alert(`${newNumber} is already in phonebook`);
		} else {
			const newPerson = { name: newName, number: newNumber };

			setPersons(persons.concat(newPerson));
			setNewName('');
			setNewNumber('');
		}
	};

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
			<Persons condition={visibleNumbers} />
		</div>
	);
};

export default App;
