import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { HealthCheckEntry } from '../types';

const HCEntry: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
	const Rating: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
		switch (entry.healthCheckRating) {
			case 0:
				return <Icon color="green" name="heart" />;
			case 1:
				return <Icon color="yellow" name="heart" />;
			case 2:
				return <Icon color="orange" name="heart" />;
			case 3:
				return <Icon color="red" name="heart" />;
			default:
				return <div></div>;
		}
	};

	return (
		<div>
			<Segment style={{ margin: '10px 0' }}>
				<h4>
					{entry.date} <Icon name="doctor" size="large" />
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
				<Rating entry={entry} />
			</Segment>
		</div>
	);
};

export default HCEntry;
