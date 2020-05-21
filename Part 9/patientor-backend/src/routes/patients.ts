import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry } from '../utils';
import { Entry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
	try {
		const newPatientEntry = toNewPatientEntry(req.body);
		const newPatient = patientService.addPatient(newPatientEntry);
		res.json(newPatient);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

router.get('/:id', (req, res) => {
	const patient = patientService.findById(req.params.id);

	if (patient) {
		res.send(patient);
	} else {
		res.sendStatus(404);
	}
});

router.post('/:id/entries', (req, res) => {
	try {
		const id = req.params.id;
		const entry = toNewEntry(req.body) as Entry;
		const newEntry = patientService.addEntry(id, entry);
		res.json(newEntry);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

export default router;
