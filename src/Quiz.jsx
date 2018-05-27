import React, { Component } from 'react';
import { randInt } from './util';
import { halfStepsToIntervalName, intervalBetween } from './theory';

import './Quiz.css';

function IntervalInfo(props) {
  return (
    <div className="IntervalInfo">
      <p>{`midi keys: ${props.first} ${props.second}`}</p>
      <p>{`interval: ${props.intervalName},` +
          ` isCompound: ${props.isCompound},` +
          ` direction: ${props.direction}`}</p>
    </div>
  );
}

function IntervalButton(props) {
  return (
    <div className="IntervalButton">
      <button
        type="button"
        onClick={props.onClick}
      >
        {props.intervalName}
      </button>
    </div>
  );
}

function IntervalButtons(props) {
  return (
    <div className="IntervalButtons">
      {[...Array(12)].map((x, i) =>
        <IntervalButton
          key={i}
          intervalName={halfStepsToIntervalName(i)}
          onClick={() => {props.handleGuess(i)}}
        />
      )}
    </div>
  );
}

function PlayButton(props) {
  return (
    <button className="PlayButton"
            type="button"
            onClick={props.onClick}
    >
      play interval
    </button>
  );
}

function StatusLabel(props) {
  return (
    <div className="StatusLabel">
      {props.status}
    </div>
  );
}

class Quiz extends Component {
  constructor(props) {
    super();
    this.synth = props.synth;
    this.defaultStatus = 'click below to make a guess.';
    const midiKeys = this.randomMidiKeys();
    const interval = intervalBetween.apply(null, midiKeys);
    this.state = {
      midiKeys: midiKeys,
      intervalName: interval.name,
      isCompound: interval.isCompound,
      direction: interval.direction,
      noteLength: 2500,
      status: this.defaultStatus,
      showAnswer: false,
      toggleText: 'show',
      guess: null
    };
  }

  render() {
    return (
      <div className="Quiz">
        <PlayButton onClick={this.handlePlayButton} />
        <StatusLabel status={this.state.status} />
        <IntervalButtons handleGuess={this.handleGuess} />
        <button
          id="toggleButton"
          type="button"
          onClick={() => {
              this.setState({
                showAnswer: !this.state.showAnswer,
                toggleText: this.state.toggleText === 'show' ? 'hide' : 'show'
              });
          }}
        >
          {this.state.toggleText}
        </button>
        { this.state.showAnswer &&
          <IntervalInfo
            first={this.state.midiKeys[0]}
            second={this.state.midiKeys[1]}
            intervalName={this.state.intervalName}
            isCompound={this.state.isCompound}
            direction={this.state.direction}
          />
        }
        <button
          id="resetButton"
          type="button"
          onClick={this.reset}
        >
          reset
        </button>
      </div>
    );
  }

  reset = () => {
    const midiKeys = this.randomMidiKeys();
    const interval = intervalBetween.apply(null, midiKeys);
    this.setState({
      midiKeys: midiKeys,
      intervalName: interval.name,
      status: this.defaultStatus,
      guess: null
    });
  }

  handleGuess = (guess) => {
    const guessInterval = halfStepsToIntervalName(guess);
    const isCorrect = guessInterval === this.state.intervalName;
    const status = isCorrect? 'whoo, you got it!' : 'nope, try again!';
    this.setState({
      status: status,
      guess: guessInterval
    });
  }

  handlePlayButton = (event) => {
    this.playInterval({ ms: this.state.noteLength });
  }

  randomMidiKeys({midiMin = 60, midiMax = 84} = {}) {
    const midiKey0 = randInt(midiMin, midiMax);
    let midiKey1 = randInt(midiMin, midiMax);

    // make sure we have different notes
    while (midiKey0 === midiKey1) {
      midiKey1 = randInt(midiMin, midiMax);
    }

    return [midiKey0, midiKey1];
  }

  playInterval = () => {
    this.synth.playMidiKeys(this.state.midiKeys);
    setTimeout(() => {
      this.synth.stopMidiKeys(this.state.midiKeys);
    }, this.state.noteLength);
  }
}

export { Quiz };
