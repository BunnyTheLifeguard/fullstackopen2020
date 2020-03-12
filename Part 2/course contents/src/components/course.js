import React from 'react';
import Header from './header';
import Content from './content';
import Total from './total';

const Course = ({ section }) => {
	return (
		<>
			<Header name={section.name} />
			<Content parts={section.parts} />
			<Total total={section.parts} />
		</>
	);
};

export default Course;
