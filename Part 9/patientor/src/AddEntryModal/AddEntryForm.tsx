import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, NumberField, DiagnosisSelection } from './FormField';
import { HealthCheckEntry, HealthCheckRating } from '../types';
import { useStateValue } from '../state';

export type EntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
	const [{ diagnosis }] = useStateValue();

	return (
		<Formik
			initialValues={{
				description: '',
				date: '',
				specialist: '',
				type: 'HealthCheck',
				healthCheckRating: HealthCheckRating.Healthy,
				diagnosisCodes: [],
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = 'Field is required';
				const errors: { [field: string]: string } = {};
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				if (!values.type) {
					errors.type = requiredError;
				}
				if (!values.healthCheckRating && values.healthCheckRating !== 0) {
					errors.healthCheckRating = requiredError;
				}
				return errors;
			}}
		>
			{({ isValid, dirty, setFieldValue, setFieldTouched }) => {
				return (
					<Form className="form ui">
						<Field
							label="Description"
							placeholder="Description"
							name="description"
							component={TextField}
						/>
						<Field
							label="Date"
							placeholder="YYYY-MM-DD"
							name="date"
							component={TextField}
						/>
						<Field
							label="Specialist"
							placeholder="Specialist"
							name="specialist"
							component={TextField}
						/>
						<Field
							label="Type"
							placeholder="HealthCheck"
							name="type"
							component={TextField}
						/>
						<Field
							label="Health Check Rating"
							name="healthCheckRating"
							component={NumberField}
							min={0}
							max={3}
						/>
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnosis)}
						/>
						<Grid>
							<Grid.Column floated="left" width={5}>
								<Button type="button" onClick={onCancel} color="red">
									Cancel
								</Button>
							</Grid.Column>
							<Grid.Column floated="right" width={5}>
								<Button
									type="submit"
									floated="right"
									color="green"
									disabled={!dirty || !isValid}
								>
									Add
								</Button>
							</Grid.Column>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default AddEntryForm;
