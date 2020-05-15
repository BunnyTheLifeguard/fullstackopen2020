interface TrainingValues {
	target: number;
	days: number[];
}

interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const parseArgs = (args: Array<string>): TrainingValues => {
	if (args.length < 2) throw new Error('Not enough arguments');

	const nums: number[] = args.map(Number);
	nums.splice(0, 3);

	if (!nums.some(isNaN)) {
		return {
			target: Number(args[2]),
			days: nums,
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}
};

const calculateAverage = (real: number[], target: number): Result => {
	const sum = real.reduce((a, b) => a + b, 0);
	const average = sum / real.length;
	const pct = average / target;
	let rating = 0;
	let msg = '';

	if (pct < 0.5) {
		rating = 1;
		msg = 'Come on, do something!';
	} else if (pct > 0.5 && pct < 1) {
		rating = 2;
		msg = 'Not too bad but could be better';
	} else {
		rating = 3;
		msg = 'Very nice';
	}

	const Result = {
		periodLength: real.length,
		trainingDays: real.filter((d) => d !== 0).length,
		success: average >= target,
		rating: rating,
		ratingDescription: msg,
		target: target,
		average: average,
	};
	return Result;
};

if (require.main === module) {
	try {
		const { target, days } = parseArgs(process.argv);
		console.log(calculateAverage(days, target));
	} catch (e) {
		console.log('Error:', e.message);
	}
}

export default calculateAverage;
