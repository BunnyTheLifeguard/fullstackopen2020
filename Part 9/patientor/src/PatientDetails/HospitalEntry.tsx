import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

const HoEntry: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
	return (
		<div>
			<Segment style={{ margin: '10px 0' }}>
				<h4>
					{entry.date} <Icon name="hospital" size="large" />
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
				<div style={{ color: 'grey' }}>
					Discharge date: {entry.discharge.date}
				</div>
				<div style={{ color: 'grey' }}>
					Discharge criteria: {entry.discharge.criteria}
				</div>
			</Segment>
		</div>
	);
};

export default HoEntry;
