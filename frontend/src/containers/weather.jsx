import logo from '../logo.svg';
import '../App.css';
import useGetWeather from '../hooks/useGetWeather';

function Weather() {
  const { data, error, isLoading } = useGetWeather({ location: 'Lisbon' });
  console.log(data, error, isLoading)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Weather
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React with Alex
        </a>
      </header>
    </div>
  );
}

export default Weather;
