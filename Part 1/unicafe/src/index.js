import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = ({ text }) => {
	return (
		<>
			<td>
				<h1>{text}</h1>
			</td>
		</>
	);
};

const Button = ({ value, text }) => <button onClick={value}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
	if (good === 0 && neutral === 0 && bad === 0) {
		return (
			<>
				<tr>
					<Statistic text="No feedback given" />
				</tr>
			</>
		);
	}
	return (
		<>
			<tr>
				<Statistic text="good" value={good} />
			</tr>
			<tr>
				<Statistic text="neutral" value={neutral} />
			</tr>
			<tr>
				<Statistic text="bad" value={bad} />
			</tr>
			<tr>
				<Statistic text="all" value={good + neutral + bad} />
			</tr>
			<tr>
				<Statistic
					text="average"
					value={((good - bad) / (good + neutral + bad)).toFixed(1)}
				/>
			</tr>
			<tr>
				<Statistic
					text="positive"
					value={((1 - (neutral + bad) / (good + neutral + bad)) * 100).toFixed(
						1
					)}
					extra="%"
				/>
			</tr>
		</>
	);
};

const Statistic = ({ value, text, extra }) => {
	return (
		<>
			<td>{text}</td>
			<td>
				{value} {extra}
			</td>
		</>
	);
};

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<table>
				<tbody>
					<tr>
						<Title text="give feedback" />
					</tr>
					<tr>
						<td>
							<Button value={() => setGood(good + 1)} text="good" />
							<Button value={() => setNeutral(neutral + 1)} text="neutral" />
							<Button value={() => setBad(bad + 1)} text="bad" />
						</td>
					</tr>
					<tr>
						<Title text="statistics" />
					</tr>
					<Statistics good={good} neutral={neutral} bad={bad} />
				</tbody>
			</table>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
