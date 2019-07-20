import { Button, Row } from 'react-bootstrap';
import React from 'react';

import { useRegisterNavLink } from '../../components/navigation/hooks';
import ExerciseSandbox from '../../components/exercise-sandbox';
import FilePath from '../../components/file-path';
import Highlight from '../../components/highlight';
import Lesson from '../../components/lesson';

import Exercise from './exercise';
import Tips from './tips';

import AudioService from './audio.service';

import './index.css';

const Tone = class extends React.Component {
  componentDidMount() {
    this._audioService = new AudioService();
    this._audioService.setPitchRange(Math.round(Math.random() * 10000));
  }

  componentDidUpdate() {
    const { isPlaying, pitch, type, volume } = this.props;

    this._audioService.setPitch(pitch);
    this._audioService.setType(type);
    this._audioService.setVolume(volume);

    if (isPlaying) {
      this._audioService.play();
    } else {
      this._audioService.stop();
    }
  }

  render() {
    return null;
  }
};

const waveTypes = [
  'sawtooth',
  'sine',
  'square',
  'triangle',
];

class Theremin extends React.Component {
  state = {
    isPlaying: false,
    pitch: 0,
    tones: [],
    volume: 0,
  }

  _ref = React.createRef();

  _addTone = () => {
    this.setState({ tones: this.state.tones.concat(this._ref.current.value) });
  };

  _changeTone = (e) => {
    const { clientX, clientY } = e
    const { top, right, bottom, left } = e.target.getBoundingClientRect()
    const pitch = (clientX - left) / (right - left)
    const volume = 1 - (clientY - top) / (bottom - top)

    this.setState({ pitch, volume });
  };

  _play = () => {
    this.setState({ isPlaying: true });
  };

  _stop = () => {
    this.setState({ isPlaying: false });
  };

  render() {
    return (
      <div>
        <div
          className={`theremin${this.state.tones.length === 0 ? ' no-tone' : ''}`}
          onMouseEnter={this._play}
          onMouseLeave={this._stop}
          onMouseMove={this._changeTone}
        >
          {this.state.tones.map((type, index) => (
            <Tone key={index} {...this.state} type={type} />
          ))}
        </div>
        <div className="text-center">
          <select defaultValue="" ref={this._ref}>
            {waveTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          &nbsp;
          <Button variant="primary" onClick={this._addTone}>Add Tone</Button>
        </div>
      </div>
    );
  }
}

const ThereminManager = class extends React.Component {
  state = {
    instances: [],
  };

  _ref = React.createRef();

  _addTheremin = () => {
    this.setState({ instances: this.state.instances.concat(true) });
  };

  render() {
    return (
      <React.Fragment>
        <div className="text-center">
          <Button variant="primary" onClick={this._addTheremin}>Add Theremin</Button>
        </div>
        <Row className="flex-wrap justify-content-around">
          {this.state.instances.map((type, index) => (
            <Theremin key={index} />
          ))}
        </Row>
      </React.Fragment>
    );
  }
};

const ImperativeToDeclarativeLesson = () => {
  useRegisterNavLink('https://reactjs.org/docs/react-component.html#the-component-lifecycle', 'Lifecycle Functions');
  useRegisterNavLink('https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia', 'matchMedia');
  useRegisterNavLink('https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#Example_2_Monitoring_screen_resolution_or_zoom_level_changes', 'matchMedia Subscriptions')

  return (
    <Lesson tips={<Tips />}>
      <h1>Imperative to Declarative</h1>
      <div className="mt-4 text-justify">
        React's mechanism for building UI components has what turns out to be an unexpected benefit: it makes a terrific wrapper for just about anything you can possibly think of. The most obvious use case is for authoring visible UI components, but you can also author non-visible UI components. For now, that's limited to audio components, but in the future, there may be interfaces for devices that provide taste, touch, or smell feedback, and associated browser APIs that can be made use of for those types of devices.
      </div>
      <div className="mt-4 text-justify">
        Something that most people don't consider, however, is that React component wrappers can make handy declaractive wrappers for basically any API you can throw at it. Using a combination of React's lifecycle hooks and its own internal mechanisms for rerendering on state and prop updates, you can provide signals as to when and what to invoke, when to perform setup and teardown operations, etc. Components don't need to render anything, and returning <Highlight>null</Highlight> is perfectly valid, so with that in mind, you can mount a component that performs the job of any given API while rendering nothing at all.
      </div>
      <div className="mt-4 text-justify">
        Below, you'll find a Theremin component that modifies frequency and pitch depending on the region you're mousing over. Internally, it delegates out to a Tone component that handles the work of interacting with the browser's <Highlight>AudioContext</Highlight> API. This Tone component is a non-visual UI component being rendered with React, which is then wrapped in a visual UI component (the Theremin component) that provides a box for you to mouse around inside of, to control pitch and volume. Once you add a Theremin instance, you'll also need to assign it a tone type. Each Tone that you add will be initialized with a random pitch range, which means that if you add more than one Tone to a Theremin, as you mouse around inside of it, you'll hear multiple overlapping frequencies, giving it a harmonic effect. Give it a try!
      </div>
      <div className="mt-4 text-justify">
        <ThereminManager />
      </div>
      <div className="mt-4 text-justify">
        Now that you've seen how a React component wrapper can be used to interface with a native browser or 3rd-party API in order to provide declarative services to your application, let's try adding a wrapper to another browser API, <Highlight>window.matchMedia</Highlight>. This API allows you to pass a CSS <Highlight>@media</Highlight>-style query to it and get back a <Highlight>MediaQueryListener</Highlight> instance, which will tell you whether the media query matches or not. You can also add an event listener to it, to be alerted as to when the match state changes.
      </div>
      <div className="mt-4 text-justify">
        See if you can figure out how to wrap this API in a new MediaQuery component, to allow us to swap out entire views in the UI based on various media query aspects. Media queries in CSS are powerful enough, in that they allow you to define different values for margin/padding, max-widths, font-sizes, etc. based on viewport configurations, but they don't allow you to actually swap out entire semantic structures based on those configurations. A MediaQuery component will allow us to specify entirely different views to be swapped in and out based on those viewport configurations. Imagine having a non-customizable data grid to display some set of records and columns to your users on large screen devices, but on tablet-sized devices, you wanted to restrict which columns were being displayed, so your users would only see the most relevant data, and on smartphones, you wanted to use a completely different component to display only theh most relevant data to your users. You can accomplish exactly that with a component like this. Open the project's <FilePath>src/lessons/imperative-to-declarative/exercise.js</FilePath> file to get started with creating your own MediaQuery component.
      </div>
      <div className="mt-4 text-justify">
        <ExerciseSandbox>
          <Exercise />
        </ExerciseSandbox>
      </div>
    </Lesson>
  );
};

export default ImperativeToDeclarativeLesson;
