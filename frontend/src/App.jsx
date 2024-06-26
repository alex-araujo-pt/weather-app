import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Weather from './containers/weather';

const BASE_URL = '/app/';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}> 
      <Router>
        <Routes>
          <Route path={BASE_URL} element={<Weather />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
