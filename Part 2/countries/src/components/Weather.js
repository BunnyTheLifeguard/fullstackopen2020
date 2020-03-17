import React from 'react';

const Weather = ({ weather, city }) => {
	if (weather === undefined || city === undefined) {
		return null;
	} else if (weather.length === 0) {
		return null;
	} else {
		console.log(weather);
		return (
			<>
				<h2>Weather in {city}</h2>
				<div>
					<strong>Temperature: </strong>
					{(weather.main.temp - 273.15).toFixed(1)}°C
				</div>
				<div>
					<strong>Description: </strong>
					{weather.weather['0'].description}
				</div>
				<div>
					<strong>Wind: </strong>
					{weather.wind.speed}
				</div>
			</>
		);
	}
};

export default Weather;
