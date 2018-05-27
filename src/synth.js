import * as Tone from 'tone';

class Synth {
  constructor() {
    this.volume = 0.2;
    this.soundingNotes = [];
    this.voiceCount = 12;
    this.nextVoice = 0;

    this.voices = new Array(this.voiceCount);
    for (let i = 0; i < this.voiceCount; i++) {
      this.voices[i] = new Tone.Synth().toMaster();
    }
  }

  isPlaying(noteName) {
    return this.soundingNotes.some(soundingNote => {
      return noteName === soundingNote.noteName;
    });
  }

  play(noteName) {
    if (!this.isPlaying(noteName)) {
      this.voices[this.nextVoice]
        .triggerAttack(noteName, undefined, this.volume);
      this.soundingNotes.push({noteName: noteName, voice: this.nextVoice});
      this.nextVoice = (this.nextVoice + 1) % this.voiceCount;
    }
  }

  getVoice(noteName) {
    for (const soundingNote of this.soundingNotes) {
      if (noteName === soundingNote.noteName) {
        return soundingNote.voice;
      }
    }
    return false;
  }

  stop(noteName) {
    const voice = this.getVoice(noteName);
    this.voices[voice].triggerRelease();
    this.soundingNotes = this.soundingNotes.filter(soundingNote => {
      return (noteName !== soundingNote.noteName);
    });
  }

  stopAll() {
    for (const voice of this.voices) {
      voice.triggerRelease();
    }
  }

  setOscillator(oscillator) {
    for (let i = 0; i < this.voiceCount; i++) {
      this.voices[i].set({
        'oscillator': { 'type': oscillator }
      });
    }
  }

  playRandomInterval(midiMin = 48, midiMax = 109) {
    const randInt0 = Math.floor(Math.random() * (midiMax - midiMin)) + midiMin;
    const freq0 = Tone.Midi(randInt0).toFrequency();

    const randInt1 = Math.floor(Math.random() * (midiMax - midiMin)) + midiMin;
    const freq1 = Tone.Midi(randInt1).toFrequency();

    this.play(freq0);
    this.play(freq1);
    // return [randInt0, randInt1];
  }
}

export { Synth };
