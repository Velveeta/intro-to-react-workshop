import { Row } from 'react-bootstrap';
import React from 'react';

import { useRegisterNavLink } from '../../components/navigation/hooks';
import ExerciseSandbox from '../../components/exercise-sandbox';
import FilePath from '../../components/file-path';
import Highlight from '../../components/highlight';
import Lesson from '../../components/lesson';

import Exercise from './exercise';
import Tips from './tips';

import './index.css';

const ControlledFormElement = class extends React.Component {
  state = {
    value: '',
  };

  _onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <Row>
        <div>
          Controlled:
        </div>
        <div className="text-center">
          <input type="text" maxLength="25" onChange={this._onChange} value={this.state.value} />
        </div>
        <div className="text-left value">
          Value: {this.state.value}
        </div>
      </Row>
    );
  }
};

const UncontrolledFormElement = class extends React.Component {
  state = {
    value: '',
  };

  render() {
    return (
      <Row>
        <div>
          Uncontrolled:
        </div>
        <div className="text-center">
          <input type="text" maxLength="25" onChange={this._onChange} defaultValue={this.state.value} />
        </div>
        <div className="text-left value">
          Value: {this.state.value}
        </div>
      </Row>
    );
  }
};

const PartiallyControlledFormElement = class extends React.Component {
  state = {
    value: '',
  };

  _onChange = e => {
    const { onChange, value } = this.props;

    if (onChange && value !== undefined) {
      onChange(e.target.value);
    } else {
      this.setState({ value: e.target.value });
    }
  };

  render() {
    const value = (this.props.value !== undefined ? this.props.value : this.state.value);

    return (
      <Row>
        <div>
          Partially Controlled ({this.props.onChange ? 'has' : 'no'} onChange):
        </div>
        <div className="text-center">
          <input type="text" maxLength="25" onChange={this._onChange} value={value} />
        </div>
        <div className="text-left value">
          Value: {value}
        </div>
      </Row>
    );
  }
};

const FormExample = class extends React.Component {
  state = {
    partiallyControlledValue: '',
  };

  _onChange = value => {
    this.setState({ partiallyControlledValue: value });
  };

  render() {
    return (
      <div className="form-example">
        <div className="m-2">
          <ControlledFormElement />
        </div>
        <div className="m-2">
          <UncontrolledFormElement />
        </div>
        <div className="m-2">
          <PartiallyControlledFormElement onChange={this._onChange} value={this.state.partiallyControlledValue} />
        </div>
        <div className="m-2">
          <PartiallyControlledFormElement />
        </div>
      </div>
    );
  }
};

const ControllingComponentsLesson = () => {
  useRegisterNavLink('https://reactjs.org/docs/uncontrolled-components.html', 'Uncontrolled Components');
  useRegisterNavLink('https://reactjs.org/docs/forms.html', 'Controlled Components');

  return (
    <Lesson tips={<Tips />}>
      <h1>Controlling Form Components</h1>
      <div className="mt-4 text-justify">
        In React applications, you have options for how to treat form- and form-like elements. What are form-like elements? They're components that look and behave as normal native form elements would, while not actually being native form elements. Think about a custom Dropdown type of component that offers much more flexibility over styles within the dropdown list, but not actually using a <Highlight>select</Highlight> component to implement selectability.
      </div>
      <div className="mt-4 text-justify">
        Uncontrolled form elements are elements that behave as a traditional form-like element might. It's initialized to a given value, and as the user interacts with it, it tracks its own state, but nothing outside of it is tracking that state. At the time of submission, its value is evaluated and sent to some server endpoint, or aggregated into some data object for transmission to some endpoint, or whatever.
      </div>
      <div className="mt-4 text-justify">
        Controlled form elements are elements that behave slightly differently than traditional form-like elements might. In order for interactions to be reflected in the UI, the element needs to subscribe to an onChange event, which will update some upstream state variable and be propagated back down to the component in the form of updated prop values. Those updated prop values are what actually drives the component updates in the UI itself.
      </div>
      <div className="mt-4 text-justify">
        You may also opt to treat a generic form-like element as one method or the other, evaluating whether the consumer has passed a <Highlight>value</Highlight> and <Highlight>onChange</Highlight> prop, and if so, treating it as controlled, vs a <Highlight>defaultValue</Highlight> or no value-type prop whatsoever being treated as uncontrolled, and controlling its own state internally.
      </div>
      <div className="mt-4 text-justify">
        Below, you'll find examples of what happens when you use controlled vs uncontrolled form elements, as well as when you attempt to use a controlled element without actually updating its state properly. Controlling form elements allows you to keep track of their value in realtime as they update, and have their value(s) ready to go at the time of submission, or to reflect their value(s) in realtime in other areas of the application. It's typically the preferable way to deal with form-type elements.
      </div>
      <div className="mt-4 text-justify">
        <FormExample />
      </div>
      <div className="mt-4 text-justify">
        In this lesson's exercise, you'll be implementing controlled, uncontrolled, and partially-controlled variants of a custom form-like component. It doesn't offer any native form elements internally, so you'll need to implement your own interactions in order to determine when the value has changed, and provide mechanisms for propagating that change to where it needs to go, either to control its own internal state, or alert its parent components to a change in its value via an <Highlight>onChange</Highlight> event listener. Open the project's <FilePath>src/lessons/controlling-form-components/exercise.js</FilePath> file to get started working with different ways of controlling form-like elements in React.
      </div>
      <div className="mt-4 text-justify">
        <ExerciseSandbox>
          <Exercise />
        </ExerciseSandbox>
      </div>
    </Lesson>
  );
};

export default ControllingComponentsLesson;
