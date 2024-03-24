import { render, screen} from '@testing-library/react';
import Weather from './weather'; // Adjust the import path as needed.

jest.mock('../hooks/useGetWeather', () => ({
  __esModule: true,
  default: () => ({
    data: {
      current: {
        temperature: 20,
        weather_icons: ['http://example.com/image.png'],
        wind_speed: 10,
        wind_dir: 'N',
        weather_descriptions: ['Sunny'],
      },
      location: {
        name: 'New York',
        country: 'USA',
      },
    },
    error: null,
    isFetching: false,
    isSuccess: true,
  }),
}));

test('renders without crashing', () => {
  render(<Weather />);
  expect(screen.getByText('Weather App')).toBeInTheDocument();
});
