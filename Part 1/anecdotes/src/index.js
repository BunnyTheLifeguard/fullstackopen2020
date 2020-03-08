import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes }) => {
	const [selected, setSelected] = useState(0);

	const getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	};

	const points = Array({ anecdotes }.anecdotes.length).fill(0);
	const [votes, setVotes] = useState([...points]);

	const increaseVote = () => {
		votes[selected] += 1;
		setVotes(votes.map((vote) => vote));
	};

	return (
		<div>
			<Headline text="Anecdote of the day" />
			<div>{anecdotes[selected]}</div>
			<p>has {votes[selected]} votes</p>
			<Button click={increaseVote} text="vote" />
			<Button
				click={() => setSelected(getRandomInt(0, anecdotes.length))}
				text="next anecdote"
			/>
			<p></p>
			<Headline text="Anecdote with the most votes" />
			<div>{anecdotes[votes.indexOf(Math.max.apply(null, votes))]}</div>
			<p>has {Math.max.apply(null, votes)} votes</p>
		</div>
	);
};

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const Button = ({ click, text }) => <button onClick={click}>{text}</button>;
const Headline = ({ text }) => <h1>{text}</h1>;

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
