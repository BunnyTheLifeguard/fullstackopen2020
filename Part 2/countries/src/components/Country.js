import React from 'react';

const Country = ({ countries, showAll, specifyCountry, specifyCity }) => {
	const filteredCountries = countries.filter((item) =>
		item.name.startsWith(showAll)
	);

	if (filteredCountries.length === 0 || filteredCountries.length === 250) {
		return <div>No country selected</div>;
	} else if (filteredCountries.length > 10) {
		return <div>Too many matches, specify another filter</div>;
	} else if (filteredCountries.length < 10 && filteredCountries.length > 1) {
		return (
			<ul>
				{filteredCountries.map((country) => (
					<li key={country.alpha3Code}>
						{country.name}{' '}
						<button
							key={country.alpha2Code}
							onClick={() => {
								specifyCountry(country.name);
								specifyCity(country.capital);
							}}
						>
							Show
						</button>
					</li>
				))}
			</ul>
		);
	} else {
		filteredCountries.map((country) => specifyCity(country.capital));
		return (
			<>
				{filteredCountries.map((country) => (
					<>
						<h1 key={country.name}>{country.name}</h1>
						<div key={country.capital}>Capital: {country.capital}</div>
						<div key={country.population}>Population: {country.population}</div>
						<h2>Languages</h2>
						<ul>
							{country.languages.map((language) => (
								<li key={language.name}>{language.name}</li>
							))}
						</ul>
						<img
							src={country.flag}
							alt="country flag"
							style={{ width: '7.5%', height: '7.5%' }}
						/>
					</>
				))}
			</>
		);
	}
};

export default Country;
