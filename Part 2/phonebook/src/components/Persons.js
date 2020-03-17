import React from 'react';

const Persons = ({ condition, removeContact }) => {
	const nameList = () =>
		condition.map((item) => (
			<li key={item.id}>
				{item.name}: {item.number}{' '}
				<button onClick={(event) => removeContact(item.id, event)}>
					Delete
				</button>
			</li>
		));

	return (
		<>
			<ul>{nameList()}</ul>
		</>
	);
};

export default Persons;
