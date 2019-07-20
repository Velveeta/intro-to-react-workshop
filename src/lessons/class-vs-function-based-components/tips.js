import React from 'react';

const ClassVsFunctionBasedComponentsTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        If you find yourself stuck wondering whether something should be a class-based or a functional component, try asking yourself some of these questions:
      </div>
      <div className="mt-3 text-justify">
        <ul>
          <li>Does this component need to track internal state for any reason (e.g. open/close, form data, etc)?</li>
          <li>Does this component have its own custom event listeners (e.g. onSubmit, do some kind of data validation)?</li>
          <li>Does this component require use of React's lifecycle methods to perform setup or teardown of some operation?</li>
        </ul>
      </div>
      <div className="mt-2 text-justify">
        If the answer to any of these questions is yes, it would probably be a good idea to write it as a class-based component. If not, and you're only dealing with incoming prop values and rendering fairly simple components, you should be fine writing a functional component.
      </div>
    </div>
  </React.Fragment>
);

export default ClassVsFunctionBasedComponentsTips;
