import patients from '../data/patients';
import { v4 as uuidv4 } from 'uuid';

import {
	PatientEntry,
	newPatientEntry,
	Patient,
	PublicPatient,
	Entry,
} from '../types';

const getEntries = (): PublicPatient[] => {
	return patients.map(
		({ id, name, dateOfBirth, gender, occupation, entries }) => ({
			id,
			name,
			dateOfBirth,
			gender,
			occupation,
			entries,
		})
	);
};

const findById = (id: string) => {
	const entry = patients.find((p) => p.id === id);
	if (!entry) {
		return undefined;
	} else if (!('entries' in entry)) {
		const withEntries = { ...(entry as PatientEntry), entries: [] };
		return withEntries;
	}
	return entry;
};

const addPatient = (entry: newPatientEntry): PatientEntry => {
	if ('entries' in entry) {
		const newPatient = {
			id: uuidv4(),
			...(entry as Patient),
		};
		patients.push(newPatient);
		return newPatient;
	} else {
		const newPatient = {
			id: uuidv4(),
			entries: [],
			...(entry as Patient),
		};
		patients.push(newPatient);
		return newPatient;
	}
};

const addEntry = (id: string, entry: Entry): Entry | undefined => {
	const patient = patients.find((p) => p.id === id);
	if (patient && entry) {
		const patientEntries: Entry[] = patient.entries;
		const newEntry = {
			id: uuidv4(),
			...entry,
		};
		patientEntries.push(newEntry);
		return newEntry;
	}
	return undefined;
};

export default {
	getEntries,
	addPatient,
	findById,
	addEntry,
};
