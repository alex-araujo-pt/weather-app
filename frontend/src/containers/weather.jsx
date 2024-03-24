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

  const renderWeather = () => {
    if (isFetching) {
      return <div>Loading...</div>
    }
    if (error) {
      console.log(data)
      return (<div>Something wrong here</div>);
    }
    if (isSuccess && data?.error) {
      return <div>{data.error}</div>;
    }
  
    if (isSuccess && data?.current) {
      return displayWeather({ data });
    }
  
    return null;
  }

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
        {renderWeather()}
      </div>
    </div>
  );
}

export default Weather;
