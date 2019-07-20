const AudioService = class {
  constructor() {
    const context = new AudioContext();

    this._gain = context.createGain();
    this._oscillator = context.createOscillator();

    this._oscillator.start(0);
    this._isPlaying = false;

    this._pitchBase = 50;
    this._pitchBend = 0;
    this._pitchRange = 2000;

    this._frequency = this._pitchBase;
    this._type = 'sine';
    this._volume = 0.5;

    this._gain.connect(context.destination);
  }

  play() {
    if (!this._isPlaying) {
      this._oscillator.connect(this._gain);
      this._isPlaying = true;
    }
  }

  stop() {
    if (this._isPlaying) {
      this._oscillator.disconnect(this._gain);
      this._isPlaying = false;
    }
  }

  setPitch(pitch) {
    this._pitchBend = pitch;
    this._oscillator.frequency.value = this._frequency;
    this._frequency = this._pitchBase + (this._pitchBend * this._pitchRange);
  }

  setPitchRange(range) {
    this._pitchRange = range;
  }

  setType(type) {
    this._oscillator._type = type;
  }

  setVolume(volume) {
    this._gain.gain.value = this._volume;
    this._volume = volume;
  }
};

export default AudioService;
