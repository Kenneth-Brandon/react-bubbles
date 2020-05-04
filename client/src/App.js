import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import Private from './components/Private';
import BubblePage from './components/BubblePage';

import './styles.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Private exact path="/bubbles" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
