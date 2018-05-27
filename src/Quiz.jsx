import React, { Component } from 'react';
import { randInt } from './util';
import { halfStepsToInterval, intervalBetween } from './theory';

import './Quiz.css';

function IntervalInfo(props) {
  return (
    <div className="IntervalInfo">
      <p>{`midi keys: ${props.first} ${props.second}`}</p>
      <p>{`interval: ${props.interval},` +
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
      intervalName={halfStepsToInterval(i)}
      onClick={() => {}}
      />
    )}
    </div>
  );
}

class IntervalDisplay extends Component {
  constructor(props) {
    super();
    const [first, second] = props.midiKeys;
    const { interval, isCompound, direction } = intervalBetween(first, second);

    this.state = {
      show: false,
      text: 'show',
      first: first,
      second: second,
      interval: interval,
      isCompound: isCompound,
      direction: direction
    };
  }

  render() {
    return (
      <div id="IntervalDisplay"
           className="IntervalDisplay"
      >
        <IntervalButtons />
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
            interval={this.state.interval}
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

class Quiz extends Component {
  constructor(props) {
    super();
    this.synth = props.synth;
    this.state = {
      midiKeys: this.randomMidiKeys(),
      noteLength: 2500
    };
  }

  render() {
    return (
      <div className="Quiz">
        <PlayButton onClick={this.handlePlayButton} />
        <IntervalDisplay midiKeys={this.state.midiKeys} />
      </div>
    );
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
