import { Row } from 'react-bootstrap';
import React from 'react';

/**
 * Use this module to practice writing components with data hookups of varying types.
 * React offers 3 traditional ways of hookup a component up to its data source, using
 * local state, passed props, or context. You'll want to learn which situations call
 * for using which methods of binding components ot their data source, so that you can
 * get the data from where it's original stored, to the component that actually needs
 * it, ideally without having to pass it along as props every single step of the way.
 *
 * The following form fields (minus the TextInput component) are intended to make up
 * your forms for this exercise. Some shell components have been provided to wrap them
 * as a view, but you'll need to implement the MyStatefulForm component using local
 * state, then work on the MyFormPropsWrapper component to pass *its* local state down
 * through the MyFormIntermediatePropWrapper component to the target MyFormWithProps
 * component. Finally, a MyFormContextWrapper component has been implemented for you,
 * which makes use of a partially-written FormProvider component. The goal of that is
 * to render the Provider that came out of React.createContext, pass through the layer
 * of the MyFormWithContext component, and then hook up to it via the Consumer component
 * down at the MyFormWithContext layer. When you finish this exercise, all 3 sets of
 * form inputs should be updating full as you type.
 **/

const TextInput = props => (
  <div className="text-center">
    <input {...props} type="text" />
  </div>
);

const EmailAddressField = ({ value = '', ...props }) => (
  <TextInput {...props} placeholder="Email Address" value={value} />
);

const FirstNameField = ({ value = '', ...props }) => (
  <TextInput {...props} placeholder="First Name" value={value} />
);

const LastNameField = ({ value = '', ...props }) => (
  <TextInput {...props} placeholder="Last Name" value={value} />
);

const PhoneNumberField = ({ value = '', ...props }) => (
  <TextInput {...props} placeholder="Phone Number" value={value} />
);

/*************************************************************
 * This section is for the Form component with state updates *
 *************************************************************/
const MyStatefulForm = class extends React.Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  };

  _onChange = fieldName => e => {
    this.setState({ [fieldName]: e.target.value });
  };

  render() {
    return (
      <fieldset>
        <legend className="text-center">Form using State:</legend>
        <FirstNameField />
        <LastNameField />
        <EmailAddressField />
        <PhoneNumberField />
      </fieldset>
    );
  }
};

/************************************************************
 * This section is for the Form component with prop updates *
 ************************************************************/
const MyFormWithProps = () => (
  <fieldset>
    <legend className="text-center">Form using Props:</legend>
    <FirstNameField />
    <LastNameField />
    <EmailAddressField />
    <PhoneNumberField />
  </fieldset>
);

const MyFormIntermediatePropWrapper = () => (
  <MyFormWithProps />
);

const MyFormPropsWrapper = class extends React.Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  };

  _onChange = fieldName => e => {
    this.setState({ [fieldName]: e.target.value });
  };

  render() {
    const { email, firstName, lastName, phone } = this.state;

    return (
      <MyFormIntermediatePropWrapper
        email={email}
        firstName={firstName}
        lastName={lastName}
        onEmailChange={this._onChange('email')}
        onFirstNameChange={this._onChange('firstName')}
        onLastNameChange={this._onChange('lastName')}
        onPhoneChange={this._onChange('phone')}
        phone={phone}
      />
    );
  }
};

/***************************************************************
 * This section is for the Form component with context updates *
 ***************************************************************/
// eslint-disable-next-line no-unused-vars
const { Consumer, Provider } = React.createContext();

const FormProvider = class extends React.Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  };

  _onChange = fieldName => e => {
    this.setState({ [fieldName]: e.target.value });
  };

  render() {
    return this.props.children;
  }
};

const MyFormWithContext = () => (
  <fieldset>
    <legend className="text-center">Form using Context:</legend>
    <FirstNameField />
    <LastNameField />
    <EmailAddressField />
    <PhoneNumberField />
  </fieldset>
);

const MyFormIntermediateContextWrapper = () => (
  <MyFormWithContext />
);

const MyFormContextWrapper = () => (
  <FormProvider>
    <MyFormIntermediateContextWrapper />
  </FormProvider>
);

const Exercise = () => (
  <React.Fragment>
    <Row className="justify-content-between">
      <MyStatefulForm />
      <MyFormPropsWrapper />
      <MyFormContextWrapper />
    </Row>
  </React.Fragment>
);

export default Exercise;

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 * *************************************************************
 * * This section is for the Form component with state updates *
 * *************************************************************
 * const MyStatefulForm = class extends React.Component {
 *   state = {
 *     email: '',
 *     firstName: '',
 *     lastName: '',
 *     phone: '',
 *   };
 *
 *   _onChange = fieldName => e => {
 *     this.setState({ [fieldName]: e.target.value });
 *   };
 *
 *   render() {
 *     const { email, firstName, lastName, phone } = this.state;
 *
 *     return (
 *       <fieldset>
 *         <legend className="text-center">Form using State:</legend>
 *         <FirstNameField onChange={this._onChange('firstName')} value={firstName} />
 *         <LastNameField onChange={this._onChange('lastName')} value={lastName} />
 *         <EmailAddressField onChange={this._onChange('email')} value={email} />
 *         <PhoneNumberField onChange={this._onChange('phone')} value={phone} />
 *       </fieldset>
 *     );
 *   }
 * };
 *
 * ************************************************************
 * * This section is for the Form component with prop updates *
 * ************************************************************
 * const MyFormWithProps = ({
 *   email,
 *   firstName,
 *   lastName,
 *   onEmailChange,
 *   onFirstNameChange,
 *   onLastNameChange,
 *   onPhoneChange,
 *   phone,
 * }) => (
 *   <fieldset>
 *     <legend className="text-center">Form using Props:</legend>
 *     <FirstNameField onChange={onFirstNameChange} value={firstName} />
 *     <LastNameField onChange={onLastNameChange} value={lastName} />
 *     <EmailAddressField onChange={onEmailChange} value={email} />
 *     <PhoneNumberField onChange={onPhoneChange} value={phone} />
 *   </fieldset>
 * );
 *
 * const MyFormIntermediatePropWrapper = ({
 *   email,
 *   firstName,
 *   lastName,
 *   onEmailChange,
 *   onFirstNameChange,
 *   onLastNameChange,
 *   onPhoneChange,
 *   phone,
 * }) => (
 *   <MyFormWithProps
 *     email={email}
 *     firstName={firstName}
 *     lastName={lastName}
 *     onEmailChange={onEmailChange}
 *     onFirstNameChange={onFirstNameChange}
 *     onLastNameChange={onLastNameChange}
 *     onPhoneChange={onPhoneChange}
 *     phone={phone}
 *   />
 * );
 *
 * const MyFormPropsWrapper = class extends React.Component {
 *   state = {
 *     email: '',
 *     firstName: '',
 *     lastName: '',
 *     phone: '',
 *   };
 *
 *   _onChange = fieldName => e => {
 *     this.setState({ [fieldName]: e.target.value });
 *   };
 *
 *   render() {
 *     const { email, firstName, lastName, phone } = this.state;
 *
 *     return (
 *       <MyFormIntermediatePropWrapper
 *         email={email}
 *         firstName={firstName}
 *         lastName={lastName}
 *         onEmailChange={this._onChange('email')}
 *         onFirstNameChange={this._onChange('firstName')}
 *         onLastNameChange={this._onChange('lastName')}
 *         onPhoneChange={this._onChange('phone')}
 *         phone={phone}
 *       />
 *     );
 *   }
 * };
 *
 * ***************************************************************
 * * This section is for the Form component with context updates *
 * ***************************************************************
 * const { Consumer, Provider } = React.createContext();
 *
 * const FormProvider = class extends React.Component {
 *   state = {
 *     email: '',
 *     firstName: '',
 *     lastName: '',
 *     phone: '',
 *   };
 *
 *   _onChange = fieldName => e => {
 *     this.setState({ [fieldName]: e.target.value });
 *   };
 *
 *   render() {
 *     const value = {
 *       ...this.state,
 *       onEmailChange: this._onChange('email'),
 *       onFirstNameChange: this._onChange('firstName'),
 *       onLastNameChange: this._onChange('lastName'),
 *       onPhoneChange: this._onChange('phone'),
 *     };
 *
 *     return (
 *       <Provider value={value}>
 *         {this.props.children}
 *       </Provider>
 *     );
 *   }
 * };
 *
 * const MyFormWithContext = () => (
 *   <Consumer>
 *     {({
 *       email,
 *       firstName,
 *       lastName,
 *       phone,
 *       onEmailChange,
 *       onFirstNameChange,
 *       onLastNameChange,
 *       onPhoneChange,
 *     }) => (
 *       <fieldset>
 *         <legend className="text-center">Form using Context:</legend>
 *         <FirstNameField onChange={onFirstNameChange} value={firstName} />
 *         <LastNameField onChange={onLastNameChange} value={lastName} />
 *         <EmailAddressField onChange={onEmailChange} value={email} />
 *         <PhoneNumberField onChange={onPhoneChange} value={phone} />
 *       </fieldset>
 *     )}
 *   </Consumer>
 * );
 *
 * const MyFormIntermediateContextWrapper = () => (
 *   <MyFormWithContext />
 * );
 *
 * const MyFormContextWrapper = () => (
 *   <FormProvider>
 *     <MyFormIntermediateContextWrapper />
 *   </FormProvider>
 * );
 **/
