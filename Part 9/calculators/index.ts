import express from 'express';
const app = express();

import calculateBmi from './bmiCalculator';

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

const PORT = 3003;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
