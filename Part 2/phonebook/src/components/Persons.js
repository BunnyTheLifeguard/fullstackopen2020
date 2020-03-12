import React from 'react';

const Persons = ({ condition }) => {
	const nameList = () =>
		condition.map((item) => (
			<li key={item.name}>
				{item.name}: {item.number}
			</li>
		));

	return (
		<>
			<ul>{nameList()}</ul>
		</>
	);
};

export default Persons;
