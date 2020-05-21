/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	newPatientEntry,
	Gender,
	Entry,
	HealthCheckEntry,
	OccupationalHealthcareEntry,
	HospitalEntry,
	EntryType,
	Discharge,
} from './types';

const isString = (text: any): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
	return Object.values(Gender).includes(param);
};

const isNumber = (num: any): num is number => {
	return typeof num === 'number' || num instanceof Number;
};

const isEntryType = (param: any): param is EntryType => {
	return Object.values(EntryType).includes(param);
};

const parseName = (name: any): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name: ' + name);
	}
	return name;
};

const parseSSN = (ssn: any): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error('Incorrect or missing ssn: ' + ssn);
	}
	return ssn;
};

const parseJob = (occupation: any): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error('Incorrect or missing occupation: ' + occupation);
	}
	return occupation;
};

const parseDate = (date: any): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}
	return date;
};

const parseGender = (gender: any): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}
	return gender;
};

const toNewPatientEntry = (object: any): newPatientEntry => {
	const newEntry: newPatientEntry = {
		name: parseName(object.name),
		dateOfBirth: parseDate(object.dateOfBirth),
		ssn: parseSSN(object.ssn),
		gender: parseGender(object.gender),
		occupation: parseJob(object.occupation),
	};

	return newEntry;
};

const parseDescription = (description: any): string => {
	if (!description || !isString(description)) {
		throw new Error('Incorrect or missing description: ' + description);
	}
	return description;
};

const parseSpecialist = (specialist: any): string => {
	if (!specialist || !isString(specialist)) {
		throw new Error('Incorrect or missing specialist: ' + specialist);
	}
	return specialist;
};

const parseEmployer = (employer: any): string => {
	if (!employer || !isString(employer)) {
		throw new Error('Incorrect or missing employer: ' + employer);
	}
	return employer;
};

const parseHCRating = (rating: any): number => {
	if (!rating || !isNumber(rating) || rating > 4 || rating < 0) {
		throw new Error('Incorrect or missing health rating: ' + rating);
	}
	return rating;
};

const parseEntryType = (type: any): EntryType => {
	if (!type || !isEntryType(type)) {
		throw new Error('Incorrect or missing type: ' + type);
	}
	return type;
};

const parseDischarge = (discharge: any): Discharge => {
	if (!discharge || !discharge.date || !discharge.criteria) {
		throw new Error('Incorrect or missing discharge data: ' + discharge);
	}
	return discharge;
};

export const toNewEntry = (object: any): Omit<Entry, 'id'> => {
	if (object.type === 'HealthCheck') {
		const newHCEntry: Omit<HealthCheckEntry, 'id'> = {
			description: parseDescription(object.description),
			date: parseDate(object.date),
			specialist: parseSpecialist(object.specialist),
			healthCheckRating: parseHCRating(object.healthCheckRating),
			type: parseEntryType(object.type),
		};
		return newHCEntry;
	} else if (object.type === 'OccupationalHealthcare') {
		const newOHCEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
			description: parseDescription(object.description),
			date: parseDate(object.date),
			specialist: parseSpecialist(object.specialist),
			type: parseEntryType(object.type),
			employerName: parseEmployer(object.employerName),
		};
		return newOHCEntry;
	} else {
		const newHEntry: Omit<HospitalEntry, 'id'> = {
			description: parseDescription(object.description),
			date: parseDate(object.date),
			specialist: parseSpecialist(object.specialist),
			type: parseEntryType(object.type),
			discharge: parseDischarge(object.discharge),
		};
		return newHEntry;
	}
};

export default toNewPatientEntry;
