import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHCEntry: React.FC<{ entry: OccupationalHealthcareEntry }> = ({
	entry,
}) => {
	return (
		<div>
			<Segment style={{ margin: '10px 0' }}>
				<h4>
					{entry.date} <Icon name="stethoscope" size="large" />{' '}
					{entry.employerName}
				</h4>
				<p style={{ color: 'grey' }}>
					<i>{entry.description}</i>
				</p>
				<div style={{ color: 'grey' }}>Specialist: {entry.specialist}</div>
				{entry.diagnosisCodes && (
					<div style={{ color: 'grey' }}>
						Diagnoses:{' '}
						<ul>
							{entry.diagnosisCodes.map((code) => (
								<li key={code}>{code}</li>
							))}
						</ul>
					</div>
				)}
				{entry.sickLeave && (
					<div style={{ color: 'grey' }}>
						Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
					</div>
				)}
			</Segment>
		</div>
	);
};

export default OccupationalHCEntry;
