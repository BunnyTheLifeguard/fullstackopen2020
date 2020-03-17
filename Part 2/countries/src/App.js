import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import Country from './components/Country';

const api_key = process.env.REACT_APP_API_KEY;

const App = () => {
	const [countries, setCountries] = useState([]);
	const [showAll, setShowAll] = useState([]);
	const [city, setCity] = useState();
	const [weather, setWeather] = useState([]);

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
			setCountries(response.data);
		});
	}, []);

	useEffect(() => {
		if (city === undefined) {
			console.log('undefined');
		} else if (typeof city === 'string') {
			console.log('defined');
			axios
				.get(
					`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
				)
				.then((response) => {
					setWeather(response.data);
				});
		}
	}, [city]);

	const filter = (event) =>
		setShowAll(
			event.target.value.charAt(0).toUpperCase() +
				event.target.value.slice(1).toLowerCase()
		);

	const specifyCountry = (name) => {
		setShowAll(name);
	};

	const specifyCity = (capital) => {
		setCity(capital);
	};

	return (
		<>
			<div>Find countries</div>
			<input onChange={filter} />
			<Country
				countries={countries}
				showAll={showAll}
				specifyCountry={specifyCountry}
				specifyCity={specifyCity}
			/>
			<Weather weather={weather} city={city} />
		</>
	);
};

export default App;
