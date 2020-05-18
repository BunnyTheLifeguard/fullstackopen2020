import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
	try {
		const newPatientEntry = toNewPatientEntry(req.body);
		// const { name, dateOfBirth, ssn, gender, occupation } = req.body;
		const addedEntry = patientService.addEntry(newPatientEntry);
		res.json(addedEntry);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

// router.get('/:id', (req, res) => {
// 	const patients = patientService.getAll();
// 	const patient: Patient = patients.find((p) => p.id === req.params.id);
// 	res.json(patient);
// });

router.get('/:id', (req, res) => {
	const patient = patientService.findById(req.params.id);

	if (patient) {
		res.send(patient);
	} else {
		res.sendStatus(404);
	}
});

export default router;
