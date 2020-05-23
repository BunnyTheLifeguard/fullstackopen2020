import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddOccuHCForm, { OccuFormValues } from './AddOccuHCForm';

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: OccuFormValues) => void;
	error?: string;
}

const AddOccuHCModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
	<Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
		<Modal.Header>Add a new entry</Modal.Header>
		<Modal.Content>
			{error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
			<AddOccuHCForm onSubmit={onSubmit} onCancel={onClose} />
		</Modal.Content>
	</Modal>
);

export default AddOccuHCModal;
