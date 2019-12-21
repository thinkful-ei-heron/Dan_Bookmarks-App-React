import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdoptionPage from './components/AdoptionPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Petful</h1>
      </header>
      <Route exact path={'/'} component={HomePage} />
      <Route path={'/adopt'} component={AdoptionPage} />
    </div>
  );
}

export default App;
