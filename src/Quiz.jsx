import React, { Component } from 'react';
import { Synth } from './synth';

class Quiz extends Component {
  constructor() {
    super();
    this.synth = new Synth();
  }

  render() {
    return (
      <div className="Quiz">
        <p>name the interval:</p>
        <button type="button"
                onClick={this.handlePlayBtn}
        >
        play interval
        </button>
        <button
          id="stop-button"
          type="button"
          onClick={this.handleStopBtn}
        >
        stop
        </button>
      </div>
    );
  }

  handlePlayBtn = (event) => {
    this.synth.playRandomInterval();
  }

  handleStopBtn = (event) => {
    this.synth.stopAll();
  }
}

export { Quiz };
