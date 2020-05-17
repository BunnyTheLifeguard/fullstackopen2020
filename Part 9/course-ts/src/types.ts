interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface WithDescription extends CoursePartBase {
	description: string;
}

interface CoursePartOne extends WithDescription {
	name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
	name: 'Using props to pass data';
	groupProjectCount: number;
}

interface CoursePartThree extends WithDescription {
	name: 'Deeper type usage';
	exerciseSubmissionLink: string;
}

interface CoursePartFour {
	name: 'Another one';
	exerciseCount: number;
	description: string;
}

export type CoursePart =
	| CoursePartOne
	| CoursePartTwo
	| CoursePartThree
	| CoursePartFour;
