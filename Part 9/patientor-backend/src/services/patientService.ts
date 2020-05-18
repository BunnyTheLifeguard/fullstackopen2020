import patients from '../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { withoutSsn, PatientEntry, newPatientEntry, Patient } from '../types';

const getEntries = (): withoutSsn[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

// const getAll = (): Patient[] => {
// 	return patients.map(
// 		({ id, name, ssn, occupation, gender, dateOfBirth, entries }): Patient => ({
// 			id,
// 			name,
// 			ssn,
// 			occupation,
// 			gender,
// 			dateOfBirth,
// 			entries,
// 		})
// 	);
// };

const findById = (id: string): Patient | undefined => {
	let entry = patients.find((p) => p.id === id);
	if (!entry) {
		return undefined;
	} else if (!entry.entries) {
		entry = { ...entry, entries: [] };
		return entry;
	}
	return entry;
	// if (!patients.entries) {
	// 	const withEntries = patients.map((p) => ({ ...p, entries: [] }));
	// 	const entry = withEntries.find((p) => p.id === id);
	// 	return entry;
	// } else {
	// 	const entry = patients.find((p) => p.id === id);
	// 	return entry;
	// }
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
