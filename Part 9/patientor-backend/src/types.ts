export interface DiagnoseEntry {
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
	male = 'male',
	female = 'female',
	other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

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
