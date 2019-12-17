import React from 'react';

import CodeBlock from '../../components/code-block';

const MemoizationTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        One of the more common causes of performance issues in React applications is the number of times the render lifecycle is invoked, especially with deep component trees. This can happen due to state changes that bubble down through the application when they don't need to. Subclassing from React.PureComponent, as well as using React.memo, can go a long way.
      </div>
      <div className="mt-3 text-justify">
        When trying to resolve performance issues, look for array operations that output new references, especially inside render functions. Also look for object copies being created, either as the result of merging objects or creating new ones from some set of properties. In addition, be wary of using new function references during the render lifestyle. Consider the following example:
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`const MyComponent = <div onClick={(e) => { onClickHandler(e) }}>Hello World!</div>;`}</CodeBlock>
      </div>
      <div className="mt-3 text-justify">
        The 'onClick' function signature is just receiving the argument passed to it and proxying that through to the underlying handler, which has the exact same signature. It's just created a new function reference for no reason, when it could have simply passed 'onClickHandler' directly as the 'onClick' prop's value.
      </div>
      <div className="mt-3 text-justify">
        One last item to consider is a case when you have an event handler that you need to pass information to about a given record within a list of records. If you had a list of form inputs, for example, and wanted them all to use the same 'onChange' handler, you could do something like the following.
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`const MyForm = class extends React.Component {
  state = {
    firstName: '',
    lastName: '',
  };

  _onChange = fieldName => e => {
    this.setState({ [fieldName]: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <input onChange={this._onChange('firstName')} placeholder="First Name" />
        <input onChange={this._onChange('lastName')} placeholder="Last Name" />
      </React.Fragment>
    );
  }
};`}</CodeBlock>
      </div>
      <div className="mt-3 text-justify">
        This abstracts the 'onChange' handler in such a way that you only need a single one for any number of elements. Each time that _onChange function is called, on each render cycle, it's creating a closure to trap the field name for use later, but the tradeoff for that simplicity is that it's then returning a new function reference for the handler, every single time. When you have a large list of items that you're doing something similar with, this is creating huge numbers of unique function references. Consider moving that handler down a level into the target component, so that it can maintain a single function reference on its own instance. Then it can just read the needed props from its props set, and pass the relevant one(s) back to the callback.
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`const TextInput = class extends React.Component {
  _onChange = e => {
    const { name, onChange } = this.props;

    if (onChange) {
      onChange(name, e.target.value);
    }
  }

  render() {
    return <input type="text" {...this.props} onChange={this._onChange} />
  }
};

const MyForm = class extends React.Component {
  state = {
    firstName: '',
    lastName: '',
  };

  _onChange = (fieldName, value) => {
    this.setState({ [fieldName]: value });
  };

  render() {
    return (
      <React.Fragment>
        <input name="firstName" onChange={this._onChange} placeholder="First Name" />
        <input name="lastName" onChange={this._onChange} placeholder="Last Name" />
      </React.Fragment>
    );
  }
};`}</CodeBlock>
      </div>
    </div>
  </React.Fragment>
);

export default MemoizationTips;
