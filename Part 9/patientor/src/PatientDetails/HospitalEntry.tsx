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
			</Segment>
		</div>
	);
};

export default HoEntry;
