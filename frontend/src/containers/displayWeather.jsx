import React from "react";

const weatherEmojiMap = {
  'Sunny': '☀️',
  'Rainy': '🌧️',
  'Cloudy': '☁️',
  'Snow': '❄️',
  'Fog': '🌫️',
};

const displayWeather = ({ data }) => {
  const { current, location } = data;
  const { weather_descriptions } = current;
  const weatherDescription = weather_descriptions[0];

  const weatherEmoji = weatherEmojiMap[weatherDescription] || '🌈';

  return (
    <div>
      <h2>Weather in {location.name}, {location.country}</h2>
      <p>{weatherDescription} {weatherEmoji}</p>
      <p>Temperature: {current.temperature}°C</p>
      <p>Humidity: {current.humidity}%</p>
      <p>Wind: {current.wind_speed} km/h {current.wind_dir}</p>
    </div>
  );
};

export default displayWeather;