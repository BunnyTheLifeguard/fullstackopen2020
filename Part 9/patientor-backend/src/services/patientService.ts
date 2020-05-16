import patients from '../data/patients';

import { withoutSsn } from '../types';

const getEntries = (): withoutSsn[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addEntry = () => {
	return null;
};

export default {
	getEntries,
	addEntry,
};
