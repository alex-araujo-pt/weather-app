import React, { useState } from 'react';
import '../App.css';
import useGetWeather from '../hooks/useGetWeather';
import displayWeather from './displayWeather';

function Weather() {
  const [locationInput, setLocationInput] = useState('');
  const [location, setLocation] = useState('');

  const { data, error, isFetching, isSuccess } = useGetWeather({ location });

  const handleInputChange = (event) => {
    setLocationInput(event.target.value);
  };

  const handleGetWeather = () => {
    setLocation(locationInput);
  };

  const loading = () => (
    <div>Loading...</div>
  );


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Weather App
        </p>
      </header>
      <div>
        <input
          type="text"
          value={locationInput}
          onChange={handleInputChange}
          placeholder="Enter a location"
        />
        <button onClick={handleGetWeather}>Get</button>
      </div>
      <div>
        {(isFetching) && loading()}
        {(isSuccess && data) && displayWeather({ data })}
      </div>
    </div>
  );
}

export default Weather;
