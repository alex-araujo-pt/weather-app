import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const BASE_URL = '/app/';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));
jest.mock('./containers/weather', () => () => <div>Mocked Weather Component</div>);

describe('App Component and Routes', () => {
  test('renders Weather component for base route', () => {
    render(
      <MemoryRouter initialEntries={[`${BASE_URL}`]}>
        <App />
      </MemoryRouter>
    );
    const weatherElement = screen.queryByText(/Mocked Weather Component/i);
    expect(weatherElement).toBeInTheDocument();
  });
});
