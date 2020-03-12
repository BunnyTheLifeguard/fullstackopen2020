import React from 'react';
import Main from './components/main';

const App = ({ course }) => {
	return (
		<>
			<Main curriculum={course} />
		</>
	);
};

export default App;
