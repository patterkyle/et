import React, { Component } from 'react';
import './App.css';

import { Synth } from './synth';
import { Keyboard } from './Keyboard';
import { Quiz } from './Quiz';

class App extends Component {
  constructor() {
    super()
    this.synth = new Synth();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ear training</h1>
        </header>
        <Keyboard synth={this.synth}/>
        <Quiz synth={this.synth}/>
      </div>
    );
  }
}

export default App;
