import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from './components/Pages/LandingPage';
import Blog from './components/Blog/Blog';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/About">
          <LandingPage />
        </Route>
        <Route path="/">
          <Blog />
        </Route>
      </Router>
    </div>
  );
}

export default App;
