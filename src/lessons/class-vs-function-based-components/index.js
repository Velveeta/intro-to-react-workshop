import React from 'react';

import { useRegisterNavLink } from '../../components/navigation/hooks';
import CodeBlock from '../../components/code-block';
import ExerciseSandbox from '../../components/exercise-sandbox';
import FilePath from '../../components/file-path';
import Lesson from '../../components/lesson';

import Exercise from './exercise';
import Tips from './tips';

const ClassVsFunctioNBasedComponentsLesson = () => {
  useRegisterNavLink('https://reactjs.org/docs/react-component.html', 'React Components');
  useRegisterNavLink('https://reactjs.org/docs/components-and-props.html', 'Components and Props');

  return (
    <Lesson tips={<Tips />}>
      <h1>Class- vs Function-based Components</h1>
      <div className="mt-4 text-justify">
        Historically, all React components were class-based. It started out with factory functions, which you would supply the equivalent of a component prototype to, and eventually progressed into actual ES6 class syntax. Eventually, the overhead of class-based instances was deemed too expensive for the bulk of components people were writing, since component-based development encourages simple, discrete, reusable modules, and so functional components were introduced. This led to a lot of mixed type usage, depending on the needs of the component.
      </div>
      <div className="mt-4 text-justify">
        Primarily, class-based components are now favored whenever anything stateful is needed by the component, and functional components are typically used in all other cases. There's no hard and fast rule about this, and in most cases, it's not anything worth getting dogmatic over. Here are a couple of examples of what 2 identical components would look like when written with in their class-based and function-based forms.
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`/* Class-based component */
const MyComponent = class extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <p>This component simply wraps its children in an extra layer of information.</p>
        <div>{children}</div>
      </div>
    );
  }
};`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`/* Functional component */
const MyComponent = ({ children }) => (
  <div>
    <p>This component simply wraps its children in an extra layer of information.</p>
    <div>{children}</div>
  </div>
);`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        You may notice that the functional component is about half the line count of the class-based one. Although there's no real hard and fast rule about class-based vs functional components, for simple cases like these, you'll probably find yourself writing functional components more often than not. Go ahead and give it a shot yourself. Open the project's <FilePath>src/lessons/class-vs-function-based-components/exercise.js</FilePath> file and begin authoring your own components to get a feel for class-based vs functional, and when you might want or need to use one over the other. If you're having trouble thinking of why you might need to use one over the other, try clicking the Show Tips button at the top of the screen. Your component(s) will render below.
      </div>
      <div className="mt-4 text-justify">
        <ExerciseSandbox>
          <Exercise />
        </ExerciseSandbox>
      </div>
    </Lesson>
  );
};

export default ClassVsFunctioNBasedComponentsLesson;
