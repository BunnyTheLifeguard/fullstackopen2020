interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

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

console.log(calculateAverage([3, 0, 2, 4.5, 0, 3, 1], 2));
