interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
	type: EntryType;
	healthCheckRating: number;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: EntryType;
	employerName: string;
	sickLeave?: SickLeave;
}

export interface SickLeave {
	startDate: string;
	endDate: string;
}

export interface HospitalEntry extends BaseEntry {
	type: EntryType;
	discharge: Discharge;
}

export interface Discharge {
	date: string;
	criteria: string;
}

export enum EntryType {
	HealthCheck = 'HealthCheck',
	OccupationalHealthcare = 'OccupationalHealthcare',
	Hospital = 'Hospital',
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export interface PatientEntry {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
}

export type withoutSsn = Omit<PatientEntry, 'ssn'>;

export type newPatientEntry = Omit<PatientEntry, 'id'>;

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender;
	dateOfBirth: string;
	entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
