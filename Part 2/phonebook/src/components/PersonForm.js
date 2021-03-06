import React from 'react';

const PersonForm = ({
	addName,
	newName,
	nameChange,
	newNumber,
	numberChange
}) => {
	return (
		<>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={nameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={numberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</>
	);
};

export default PersonForm;
