import React from 'react';

const Content = ({ parts }) => {
	const topics = () =>
		parts.map((part) => (
			<p key={part.id}>
				{part.name} {part.exercises}
			</p>
		));
	return <>{topics()}</>;
};

export default Content;
