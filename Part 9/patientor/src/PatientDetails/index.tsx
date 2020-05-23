import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';

import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';
import { OccuFormValues } from '../AddOccuHCModal/AddOccuHCForm';
import AddOccuHCModal from '../AddOccuHCModal';
import { HospitalFormValues } from '../AddHospitalModal/AddHospitalForm';
import AddHospitalModal from '../AddHospitalModal';
import { useStateValue, addEntry } from '../state';

import {
	Patient,
	Entry,
	HealthCheckEntry,
	OccupationalHealthcareEntry,
	HospitalEntry,
} from '../types';
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

	const [modalHCOpen, setModalHCOpen] = React.useState<boolean>(false);
	const [modalOHCOpen, setModalOHCOpen] = React.useState<boolean>(false);
	const [modalHoOpen, setModalHoOpen] = React.useState<boolean>(false);

	const openHCModal = (): void => setModalHCOpen(true);
	const closeHCModal = (): void => {
		setModalHCOpen(false);
		setError(undefined);
	};

	const openOHCModal = (): void => setModalOHCOpen(true);
	const closeOHCModal = (): void => {
		setModalOHCOpen(false);
		setError(undefined);
	};

	const openHoModal = (): void => setModalHoOpen(true);
	const closeHoModal = (): void => {
		setModalHoOpen(false);
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
			closeHCModal();
		} catch (e) {
			console.error(e.response.data);
			setError(e.response.data.error);
		}
	};

	const submitNewOccu = async (values: OccuFormValues) => {
		try {
			const { data: newEntry } = await axios.post<OccupationalHealthcareEntry>(
				`${apiBaseUrl}/patients/${id}/entries`,
				values
			);
			dispatch(addEntry(newEntry));
			if (entries) {
				entries.push(newEntry);
				setEntries(entries);
			}
			closeOHCModal();
		} catch (e) {
			console.error(e.response.data);
			setError(e.response.data.error);
		}
	};

	const submitNewHospital = async (values: HospitalFormValues) => {
		try {
			const { data: newEntry } = await axios.post<HospitalEntry>(
				`${apiBaseUrl}/patients/${id}/entries`,
				values
			);
			dispatch(addEntry(newEntry));
			if (entries) {
				entries.push(newEntry);
				setEntries(entries);
			}
			closeHoModal();
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
					SSN: {patient.ssn}
					<br />
					Occupation: {patient.occupation}
				</p>
				<AddEntryModal
					modalOpen={modalHCOpen}
					onSubmit={submitNewEntry}
					error={error}
					onClose={closeHCModal}
				/>
				<Button onClick={() => openHCModal()}>New Health Check Entry</Button>
				<AddOccuHCModal
					modalOpen={modalOHCOpen}
					onSubmit={submitNewOccu}
					error={error}
					onClose={closeOHCModal}
				/>
				<Button onClick={() => openOHCModal()}>
					New OccupationalHealthcare Entry
				</Button>
				<AddHospitalModal
					modalOpen={modalHoOpen}
					onSubmit={submitNewHospital}
					error={error}
					onClose={closeHoModal}
				/>
				<Button onClick={() => openHoModal()}>New Hospital Entry</Button>
				<h3>Entries</h3>
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
