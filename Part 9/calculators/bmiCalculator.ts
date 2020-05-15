interface BmiValues {
	height: number;
	weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3]),
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}
};

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

if (require.main === module) {
	try {
		const { height, weight } = parseArguments(process.argv);
		console.log(calculateBmi(height, weight));
	} catch (e) {
		console.log('Error:', e.message);
	}
}
export default calculateBmi;
