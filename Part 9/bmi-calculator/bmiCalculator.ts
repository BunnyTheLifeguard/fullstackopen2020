const calculateBmi = (h: number, w: number) => {
	let bmi = '';
	h *= 0.01;
	const result = w / (h * h);
	if (result < 15) {
		bmi = 'Very severely underweight';
	} else if (15 < result && result < 16) {
		bmi = 'Severely underweight';
	} else if (16 < result && result < 18.5) {
		bmi = 'Underweight';
	} else if (18.5 < result && result < 25) {
		bmi = 'Normal (healthy weight)';
	} else if (25 < result && result < 30) {
		bmi = 'Overweight';
	} else if (30 < result && result < 35) {
		bmi = 'Obese Class I (Moderately obese)';
	} else if (35 < result && result < 40) {
		bmi = 'Obese Class II (Severely obese)';
	} else if (result > 40) {
		bmi = 'Obese Class III (Very severely obese)';
	}
	return bmi;
};

console.log(calculateBmi(180, 74));
