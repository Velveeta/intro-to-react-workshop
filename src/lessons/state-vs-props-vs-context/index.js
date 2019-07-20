import React from 'react';

import { useRegisterNavLink } from '../../components/navigation/hooks';
import CodeBlock from '../../components/code-block';
import ExerciseSandbox from '../../components/exercise-sandbox';
import FilePath from '../../components/file-path';
import Highlight from '../../components/highlight';
import Lesson from '../../components/lesson';

import Exercise from './exercise';
import Tips from './tips';

const StateVsPropsVsContextLesson = () => {
  useRegisterNavLink('https://reactjs.org/docs/state-and-lifecycle.html', 'React State');
  useRegisterNavLink('https://reactjs.org/docs/components-and-props.html', 'React Props');
  useRegisterNavLink('https://reactjs.org/docs/context.html', 'React Context');

  return (
    <Lesson tips={<Tips />}>
      <h1>State vs Props vs Context</h1>
      <div className="mt-4 text-justify">
        React offers three traditional methods for housing and passing data both within a component and to descendant components: state, props, and context. The new Hooks API now offers a 4th method, but will be covered in another lesson. State, props, and context can all be passed as any Javascript data type, from primitives to more complex data types like objects, arrays, functions, and regular expressions.
      </div>
      <div className="mt-4 text-justify">
        State is useful for housing data within a component, either for use by that component itself, passing down to its children, or both. React offers a <Highlight>setState</Highlight> function for use within components, which will set one or more state properties and cause a render cycle to be triggered, but only for that component downward in the component tree. Optionally, it takes a second parameter, a callback, to be invoked once any changes have been flushed out to the DOM.
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`const MyStatefulComponent = class extends React.Component {
  state = {
    show: false,
  };

  _onClick = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <div>
        <div>
          <button onClick={this._onClick} type="button">Toggle Content</button>
        </div>
        {this.state.show && (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        )}
      </div>
    );
  }
};`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        Props are parameters received from the parent component, which cannot be modified directly by the receiving component. They can be copied into other local variables for modification and use, but the props object itself is frozen by React. Whenever props are updated at higher levels in the component tree, they will automatically bubble their way back down to the receiving component with the updated values. One problem with using props to pass data is that there's a strict parent/child relationship between passer and receiver. If you need to get some prop(s) from the current component to another component 2 or more layers down in the tree, you have to do what's commonly referred to as <Highlight>prop-drilling</Highlight>. You have to pass props from component A to B, and then B to C, and so forth until you reach your destination. The problem with this method is that it overcomplicates the APIs of the components in between, as they now have to have knowledge of props that have no meaning to them other than to pass on to their own children.
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`const MyComponentWithProps = ({ onClick, show }) => (
  <div>
    <div>
      <button onClick={onClick} type="button">Toggle Content</button>
    </div>
    {show && (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    )}
  </div>
);

const MyStatefulComponent = class extends React.Component {
  state = {
    show: false,
  };

  _onClick = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return <MyComponentWithProps onClick={this._onClick} show={this.state.show} />;
  }
};`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        The built-in solution to this issue is the React context API. It uses a provider pattern to establish a Provider/Consumer pair of components to be used in your views. The Provider component allows you to set a <Highlight>value</Highlight> into context, which can be of any data type, and if desired, additional Providers can be nested below that level in the component tree. Any components that have need of accessing that context data simply embed a Consumer component in their view, and will receive the context value from the closest Provider above them in the component tree. This means you don't have to prop-drill anything from higher-level to lower-level components, you simply wrap them where you need the data. The Consumer component takes its children in the form of a function, which it invokes and passes the <Highlight>value</Highlight> prop to as an input parameter, and from which expects to receive some form of valid React node as a return value.
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`const MyContextConsumer = () => (
  <Consumer>
    {({ toggleShow, show }) => (
      <div>
        <div>
          <button onClick={onClick} type="button">Toggle Content</button>
        </div>
        {show && (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        )}
      </div>
    )}
  </Consumer>
);

const MyContextProvider = class extends React.Component {
  state = {
    show: false,
  };

  _toggleShow = () => {
    this.setState({ show: !this.state.show });
  };

  return (
    <Provider value={{ toggleShow: this._toggleShow, show: this.state.show }}>
      {this.props.children}
    </Provider>
  );
};`}</CodeBlock>
      </div>
      <div className="mt-4 test-justify">
        In this lesson's exercise, you'll be implementing some controlled form fields using the 3 different methods discussed on this page. None of these fields actually work right now, as they're all receiving a value prop that defaults to an empty string, meaning they expect to be controlled by an <Highlight>onChange</Highlight> handler. It will be up to you to implement that onChange handler for each type of form controller, and use the relevant method (state, props, or context) to get that handler and the associated form field data down to the fields themselves. Open the project's <FilePath>src/lessons/state-vs-props-vs-context/exercise.js</FilePath> file to start applying these 3 different methodologies to your forms, and see which ones feel better in which situations.
      </div>
      <div className="mt-4 text-justify">
        <ExerciseSandbox>
          <Exercise />
        </ExerciseSandbox>
      </div>
    </Lesson>
  );
};

export default StateVsPropsVsContextLesson;
