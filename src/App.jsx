import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './components/Pages/LandingPage';
import Blog from './components/Blog/Blog';
import TextEditor from './components/Editor/TextEditor';

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
            <TextEditor />
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
