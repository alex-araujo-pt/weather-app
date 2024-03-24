import React from "react";
import { array, number,  shape, string } from 'prop-types';

const weatherEmojiMap = {
  'Sunny': '☀️',
  'Rainy': '🌧️',
  'Cloudy': '☁️',
  'Snow': '❄️',
  'Fog': '🌫️',
};

function displayWeather({ data }) {
  const { current, location } = data;
  const { weather_descriptions } = current;
  const weatherDescription = weather_descriptions[0];
  
  const weatherEmoji = weatherEmojiMap[weatherDescription] || '🌎';
  
  return (
    <div>
      <h2>Weather in {location.name}, {location.country}</h2>
      <p>{weatherDescription} {weatherEmoji}</p>
      <p>Temperature: {current.temperature}°C</p>
      <p>Humidity: {current.humidity}%</p>
      <p>Wind: {current.wind_speed} km/h {current.wind_dir}</p>
    </div>
  );
}

displayWeather.propTypes = {
  data: shape({
    current: shape({
      temperature: number.isRequired,
      humidity: number.isRequired,
      wind_speed: number.isRequired,
      wind_dir: string.isRequired,
      weather_descriptions: array.isRequired,
    }).isRequired,
    location: shape({
      name: string.isRequired,
      country: string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default displayWeather;