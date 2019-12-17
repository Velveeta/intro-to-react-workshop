import { Button, Row } from 'react-bootstrap';
import React from 'react';

import './exercise.css';

/**
 * Use this module to practice writing controlled and/or uncontrolled variants of the
 * RadioGroup component. It should display a list of options as buttons with the look
 * of radio button circles, but there's not a single input element within its markup.
 * It's up to you to determine how and when to provide feedback to a consumer that a
 * change has occured in the value of the RadioGroup, and propagate that out to any
 * consumers, or conversely, track its value internally, so that the selected button
 * option continues to change even if nothing is controlling its value.
 **/

const RadioButton = ({ checked, children, value }) => (
  <div className={`radio-button${checked ? ' checked' : ''}`}>
    <Button variant={checked ? 'primary' : 'secondary'}>
      <span className="icon" /> {children}
    </Button>
  </div>
);

const RadioGroup = class extends React.Component {
  render() {
    const { children } = this.props;
    let currentValue = undefined;

    return (
      <div className="radio-group">
        {React.Children.map(children, child => React.cloneElement(child, {
          ...child.props,
          checked: child.props.value === currentValue,
        }))}
      </div>
    );
  }
};

const AgeRangeRadioGroup = class extends React.Component {
  state = {
    value: '',
  };

  _onChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <RadioGroup onChange={this._onChange} value={this.state.value}>
        <RadioButton value="13-17">13 - 17 years old</RadioButton>
        <RadioButton value="18-24">18 - 24 years old</RadioButton>
        <RadioButton value="25-39">25 - 39 years old</RadioButton>
        <RadioButton value="40-59">40 - 59 years old</RadioButton>
        <RadioButton value="60+">60 years or older</RadioButton>
      </RadioGroup>
    );
  }
};

const Exercise = () => (
  <Row className="justify-content-around">
    <AgeRangeRadioGroup />
  </Row>
);

export default Exercise;

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 * const RadioButton = ({ checked, children, onClick, value }) => (
 *   <div className={`radio-button${checked ? ' checked' : ''}`} onClick={() => onClick(value)}>
 *     <Button variant={checked ? 'primary' : 'secondary'}>
 *       <span className="icon" /> {children}
 *     </Button>
 *   </div>
 * );
 *
 * const RadioGroup = class extends React.Component {
 *   state = {
 *     value: this.props.defaultValue || '',
 *   };
 *
 *   _onClick = value => {
 *     const currentValue = (this.props.value !== undefined ? this.props.value : this.state.value);
 *
 *     if (value !== currentValue) {
 *       const { onChange } = this.props;
 *
 *       if (onChange) {
 *         onChange(value);
 *       } else {
 *         this.setState({ value });
 *       }
 *     }
 *   };
 *
 *   render() {
 *     const { children } = this.props;
 *     const currentValue = (this.props.value !== undefined ? this.props.value : this.state.value);
 *
 *     return (
 *       <div className="radio-group">
 *         {React.Children.map(children, child => React.cloneElement(child, {
 *           ...child.props,
 *           onClick: this._onClick,
 *           checked: child.props.value === currentValue,
 *         }))}
 *       </div>
 *     );
 *   }
 * };
 *
 * const AgeRangeRadioGroup = class extends React.Component {
 *   state = {
 *     value: '',
 *   };
 *
 *   _onChange = value => {
 *     this.setState({ value });
 *   };
 *
 *   render() {
 *     return (
 *       <RadioGroup onChange={this._onChange} value={this.state.value}>
 *         <RadioButton value="13-17">13 - 17 years old</RadioButton>
 *         <RadioButton value="18-24">18 - 24 years old</RadioButton>
 *         <RadioButton value="25-39">25 - 39 years old</RadioButton>
 *         <RadioButton value="40-59">40 - 59 years old</RadioButton>
 *         <RadioButton value="60+">60 years or older</RadioButton>
 *       </RadioGroup>
 *     );
 *   }
 * };
 **/
