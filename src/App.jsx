import { BrowserRouter as Router } from 'react-router-dom';

import LandingPage from './components/LandingPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <LandingPage />
      </Router>
    </div>
  );
}

export default App;
