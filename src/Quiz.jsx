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

class IntervalDisplay extends Component {
  constructor(props) {
    super();
    this.props = props;
    const [first, second] = props.midiKeys;
    const { name, isCompound, direction } =
      intervalBetween(first, second);

    this.state = {
      show: false,
      text: 'show',
      first: first,
      second: second,
      intervalName: name,
      isCompound: isCompound,
      direction: direction
    };
  }

  render() {
    return (
      <div id="IntervalDisplay"
           className="IntervalDisplay"
      >
        <IntervalButtons handleGuess={this.props.handleGuess} />
        <button
          id="IntervalDisplay-toggleButton"
          type="button"
          onClick={() => {
              this.setState({
                show: !this.state.show,
                text: this.state.text === 'show' ? 'hide' : 'show'
              });
          }}
        >
          {this.state.text}
        </button>
        { this.state.show &&
          <IntervalInfo
            first={this.state.first}
            second={this.state.second}
            intervalName={this.state.intervalName}
            isCompound={this.state.isCompound}
            direction={this.state.direction}
          />
        }
      </div>
    );
  }
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
      noteLength: 2500,
      status: this.defaultStatus,
      guess: null
    };
  }

  render() {
    return (
      <div className="Quiz">
        <PlayButton onClick={this.handlePlayButton} />
        <StatusLabel status={this.state.status} />
        <IntervalDisplay
          midiKeys={this.state.midiKeys}
          handleGuess={this.handleGuess}
        />
      </div>
    );
  }

  handleGuess = (guess) => {
    const guessInterval = halfStepsToIntervalName(guess);
    const status = guessInterval === this.state.intervalName ?
                   'whoo, you got it!' :
                   'nope, try again!';
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
