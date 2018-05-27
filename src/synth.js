import * as Tone from 'tone';

class Synth {
  constructor() {
    this.volume = 0.4;
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

  playNotes(notes) {
    for (const note of notes) {
      this.play(note);
    }
  }

  playMidi(midiKey) {
    this.play(Tone.Midi(midiKey).toFrequency());
  }

  playMidiKeys(midiKeys) {
    for (const midiKey of midiKeys) {
      this.playMidi(midiKey);
    }
  }

  getVoice(noteName) {
    for (const soundingNote of this.soundingNotes) {
      if (noteName === soundingNote.noteName) {
        return soundingNote.voice;
      }
    }
    return null;
  }

  stop(noteName) {
    const voice = this.getVoice(noteName);
    if (voice == null) {
      return;
    }
    this.voices[voice].triggerRelease();
    this.soundingNotes = this.soundingNotes.filter(soundingNote => {
      return (noteName !== soundingNote.noteName);
    });
  }

  stopMidiKey(midiKey) {
    this.stop(Tone.Midi(midiKey).toFrequency());
  }

  stopMidiKeys(midiKeys) {
    for (const midiKey of midiKeys) {
      this.stopMidiKey(midiKey);
    }
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
}

export { Synth };
