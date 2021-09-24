import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './components/Pages/LandingPage';
import Blog from './components/Blog/Blog';
import CustomEditor from './components/Editor/CustomEditor';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/About">
            <LandingPage />
          </Route>
          <Route path="/Editor">
            <CustomEditor />
          </Route>
          <Route path="/">
            <Blog />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
