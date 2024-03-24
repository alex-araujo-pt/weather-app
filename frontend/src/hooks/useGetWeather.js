import { useQuery } from 'react-query';
import axios from 'axios';

const useGetWeather = ({ location }) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL || 'https://weather-app.alexandrearaujo.tech';
  const url = `${baseUrl}/api/v1/weathers`;
  const token = process.env.REACT_APP_API_TOKEN || '92d17be3bc49ad18b2e0';
  
  const fetchWeatherData = async (url, location) => {
    try {
      const response = await axios.get(`${url}?location=${location}`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data : 'Network response was not ok');
    }
  };

  const queryWeather = useQuery({
    queryKey: [url, location],
    queryFn: ({ queryKey }) => {
      const [_url, location] = queryKey;
      return fetchWeatherData(_url, location);
    },
    enabled: !!location,
  });

  return queryWeather;
};

export default useGetWeather;
