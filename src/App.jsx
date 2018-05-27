import React, { Component } from 'react';
import './App.css';

import { Keyboard } from './Keyboard.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ear Training</h1>
        </header>
        <Keyboard />
      </div>
    );
  }
}

export default App;
