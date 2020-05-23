import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHospitalForm, { HospitalFormValues } from './AddHospitalForm';

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: HospitalFormValues) => void;
	error?: string;
}

const AddHospitalModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
	<Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
		<Modal.Header>Add a new entry</Modal.Header>
		<Modal.Content>
			{error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
			<AddHospitalForm onSubmit={onSubmit} onCancel={onClose} />
		</Modal.Content>
	</Modal>
);

export default AddHospitalModal;
