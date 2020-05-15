import express from 'express';
const app = express();

import calculateBmi from './bmiCalculator';
import calculateAverage from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);
	try {
		const bmi = calculateBmi(height, weight);
		res.send({ weight: weight, height: height, bmi: bmi });
	} catch (e) {
		res.send({ error: e.message });
	}
});

app.post('/exercises', (req, res) => {
	if (Object.keys(req.body).length !== 2) {
		throw new Error('parameters missing');
	} else if (
		!Array.isArray(req.body.days) ||
		typeof req.body.target !== 'number'
	) {
		throw new Error('malformatted parameters');
	} else {
		const { target, days } = req.body;
		const result = calculateAverage(days, target);
		res.json(result);
	}
});

const PORT = 3003;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
