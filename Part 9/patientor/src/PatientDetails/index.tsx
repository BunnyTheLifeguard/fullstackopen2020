import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';

import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';
import { useStateValue, addEntry } from '../state';

import { Patient, Entry, HealthCheckEntry } from '../types';
import { apiBaseUrl } from '../constants';
import HoEntry from './HospitalEntry';
import OccupationalHCEntry from './OccupationalHCEntry';
import HCEntry from './HealthCheckEntry';

const PatientDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [, dispatch] = useStateValue();

	const [error, setError] = React.useState<string | undefined>();
	const [patient, setPatient] = React.useState<Patient | undefined>();
	const [entries, setEntries] = React.useState<Entry[]>();

	const [modalOpen, setModalOpen] = React.useState<boolean>(false);

	const openModal = (): void => setModalOpen(true);
	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	React.useEffect(() => {
		const getPatientDetails = async () => {
			try {
				const patientDetails = await axios.get<Patient>(
					`${apiBaseUrl}/patients/${id}`
				);
				setPatient(patientDetails.data);
				setEntries(patientDetails.data.entries);
			} catch (e) {
				console.error(e.response.data);
				setError(e.response.data);
			}
		};
		getPatientDetails();
	}, [id]);

	const submitNewEntry = async (values: EntryFormValues) => {
		try {
			const { data: newEntry } = await axios.post<HealthCheckEntry>(
				`${apiBaseUrl}/patients/${id}/entries`,
				values
			);
			dispatch(addEntry(newEntry));
			if (entries) {
				entries.push(newEntry);
				setEntries(entries);
			}
			closeModal();
		} catch (e) {
			console.error(e.response.data);
			setError(e.response.data.error);
		}
	};

	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union member: ${JSON.stringify(value)}`
		);
	};

	const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
		switch (entry.type) {
			case 'Hospital':
				return <HoEntry key={entry.id} entry={entry} />;
			case 'OccupationalHealthcare':
				return <OccupationalHCEntry key={entry.id} entry={entry} />;
			case 'HealthCheck':
				return <HCEntry key={entry.id} entry={entry} />;
			default:
				return assertNever(entry);
		}
	};

	if (patient) {
		return (
			<div>
				<h2>
					{patient.name}
					{patient.gender === 'male' ? (
						<Icon name="man" />
					) : (
						<Icon name="woman" />
					)}
				</h2>
				<p>
					ssn: {patient.ssn}
					<br />
					occupation: {patient.occupation}
				</p>
				<AddEntryModal
					modalOpen={modalOpen}
					onSubmit={submitNewEntry}
					error={error}
					onClose={closeModal}
				/>
				<Button onClick={() => openModal()}>Add new entry</Button>
				<h3>entries</h3>
				{patient.entries.length > 0 && (
					<div>
						{patient.entries.map((entry) => EntryDetails({ entry: entry }))}
					</div>
				)}
			</div>
		);
	} else {
		return <div>{error}</div>;
	}
};

export default PatientDetails;
