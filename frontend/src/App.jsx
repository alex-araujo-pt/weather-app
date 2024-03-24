import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Weather from './containers/Weather';

const BASE_URL = 'frontend/';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}> 
      <Router>
        <Routes>
          <Route path={BASE_URL} element={<Weather />} />
          <Route path={`${BASE_URL}weather/`} element={<Weather />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
