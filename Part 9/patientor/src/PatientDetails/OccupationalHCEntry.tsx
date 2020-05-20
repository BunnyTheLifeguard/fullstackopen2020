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
			</Segment>
		</div>
	);
};

export default OccupationalHCEntry;
