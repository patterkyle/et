import React, { Component } from 'react';
import { QwertyHancock } from 'qwerty-hancock';

import './Keyboard.css';

function OscillatorSelect(props) {
  return (
    <div className="OscillatorSelect">
      <label>oscillator: </label>
      <select value={props.value}
              onChange={(event: any) => props.onChange(event)}
      >
        <option value="sine">sine</option>
        <option value="triangle">triangle</option>
        <option value="sawtooth">sawtooth</option>
        <option value="square">square</option>
      </select>
    </div>
  );
}

class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.synth = props.synth;
    this.state = {
      oscillator: 'triangle'
    }
  }

  handleOscillatorChange(event) {
    const newOsc= event.target.value;
    this.synth.setOscillator(newOsc);
    this.setState({
      oscillator: newOsc
    });
  }

  componentDidMount() {
    this.qwertyHancock = new QwertyHancock({
      id: "qwertyHancock",
      width: 600,
      height: 150,
      startNote: 'C5',
      octaves: 3
    });

    this.qwertyHancock.keyDown = (note, frequency) => {
      this.synth.play(note);
    };

    this.qwertyHancock.keyUp = (note, frequency) => {
      this.synth.stop(note);
    };
  }

  render() {
    return (
      <div className="Keyboard">
        <div id="qwertyHancock" />
        <OscillatorSelect
          value={this.state.oscillator}
          onChange={(event: any) => this.handleOscillatorChange(event)}
        />
      </div>
    );
  }
};

export { Keyboard };
