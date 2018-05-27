import React, { Component } from 'react';
import './App.css';

import { Keyboard } from './Keyboard';
import { Quiz } from './Quiz';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ear training</h1>
        </header>
        <Keyboard />
        <Quiz />
      </div>
    );
  }
}

export default App;
