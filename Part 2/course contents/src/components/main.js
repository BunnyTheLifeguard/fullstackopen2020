import React from 'react';
import Course from './course';

const Main = ({ curriculum }) => {
	const section = () =>
		curriculum.map((course) => <Course key={course.id} section={course} />);
	return <>{section()}</>;
};

export default Main;
