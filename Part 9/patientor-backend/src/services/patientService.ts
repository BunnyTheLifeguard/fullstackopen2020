import patients from '../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { withoutSsn, PatientEntry, newPatientEntry } from '../types';

const getEntries = (): withoutSsn[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const findById = (id: string) => {
	const entry = patients.find((p) => p.id === id);
	if (!entry) {
		return undefined;
	} else if (!('entries' in entry)) {
		const withEntries = { ...entry, entries: [] };
		return withEntries;
	}
	return entry;
};

const addEntry = (entry: newPatientEntry): PatientEntry => {
	const newPatient = {
		id: uuidv4(),
		...entry,
	};

	patients.push(newPatient);
	return newPatient;
};

export default {
	getEntries,
	// getAll,
	addEntry,
	findById,
};
