import React from 'react';

const Total = ({ total }) => {
	const numbers = total.map((part) => part.exercises);
	return (
		<p style={{ fontWeight: 'bold' }}>
			Total of {numbers.reduce((a, b) => a + b, 0)} exercises
		</p>
	);
};

export default Total;
