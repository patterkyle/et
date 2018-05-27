import React, { Component } from 'react';
import { QwertyHancock } from 'qwerty-hancock';
import { Synth } from './synth';

class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.synth = new Synth();
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
      </div>
    );
  }
};

export { Keyboard };
