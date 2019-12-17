import { Col, Row } from 'react-bootstrap';
import React from 'react';

import { useRegisterNavLink } from '../../components/navigation/hooks';
import ExerciseSandbox from '../../components/exercise-sandbox';
import FilePath from '../../components/file-path';
import Highlight from '../../components/highlight';
import Lesson from '../../components/lesson';
import NavigationFooter from '../../components/navigation/footer';

import Exercise from './exercise';
import Tips from './tips';

import './index.css';

const Magnifier = ({ children }) => React.Children.map(children, child => React.cloneElement(child, {
  ...child.props,
  className: (child.props.className ? `${child.props.className} magnify` : 'magnify'),
}));

const Flipper = ({ children }) => React.Children.map(children, child => React.cloneElement(child, {
  ...child.props,
  children: <span>{child.props.children}</span>,
  className: (child.props.className ? `${child.props.className} flip` : 'flip'),
}));

const CompoundComponentsLesson = () => {
  useRegisterNavLink('https://reactjs.org/docs/react-api.html#reactchildren', 'React.Children');
  useRegisterNavLink('https://reactjs.org/docs/react-api.html#cloneelement', 'React.cloneElement');

  return (
    <Lesson tips={<Tips />}>
      <h1>Compound Components</h1>
      <div className="mt-4 text-justify">
        Compound components can be thought of as managed transforms that can be applied to any components passed to it as children. They can be as simple as something that iterates over those children and applies an extra class name, or as complex as recursively traversing an entire tree of components to filter out any that didn't fit some kind of filter predicate function, or to sort them according to some custom algorithm. The point is that components themselves don't have any knowledge of what's being done to them. When they're passed to a compound component, they play by the rules of that compound component, along with any, stylistic, behavioral, or structural changes applied to them.
      </div>
      <div className="mt-4 text-justify">
        Below, you'll find a couple of examples of what compound components can be used for at a basic level. In this case, they're simply iterating over their children and applying a CSS class name, to add some hover styles. The nice thing about using a compound component for a purpose like this is that the components being acted upon stay highly portable. None of this behavior is built into them, they're merely along for the ride, and can be modified on the fly by whatever kind of component we want to wrap them in. The logic that governs those behavioral and/or stylistic changes is consolidated within the compound component itself.
      </div>
      <div className="mt-4 text-justify">
        The following 2 components are simply <Highlight>li</Highlight> lists that are wrapped in a couple of different compound components. One of them is called <Highlight>Magnifier</Highlight>, and just applies a class to it that performs a <i>transform: scale</i> operation on hover. The other is a <Highlight>Flipper</Highlight> component that also applies a class to it, but this class causes the text to flip on hover, using a simple <i>transform: rotateX</i>. These lists could be fed to any other component as children, with no transformations being applied at all, but in this case, we're using the compound component to apply it in an ad hoc fashion.
      </div>
      <div className="mt-4 text-justify">
        <Row className="justify-content-between">
          <Col>
            <h5 className="pl-4">Magnifier</h5>
            <ul>
              <Magnifier>
                <li>Star Trek: The Motion Picture</li>
                <li>Star Trek II: The Wrath of Khan</li>
                <li>Star Trek III: The Search For Spock</li>
                <li>Star Trek IV: The Voyage Home</li>
                <li>Star Trek V: The Final Frontier</li>
                <li>Star Trek VI: The Undiscovered Country</li>
                <li>Star Trek: Generations</li>
                <li>Star Trek: First Contact</li>
                <li>Star Trek: Insurrection</li>
                <li>Star Trek: Nemesis</li>
                <li>Star Trek</li>
                <li>Star Trek: Into Darkness</li>
                <li>Star Trek: Beyond</li>
              </Magnifier>
            </ul>
          </Col>
          <Col>
            <h5 className="pl-4">Flipper</h5>
            <ul>
              <Flipper>
                <li>Star Trek: The Motion Picture</li>
                <li>Star Trek II: The Wrath of Khan</li>
                <li>Star Trek III: The Search For Spock</li>
                <li>Star Trek IV: The Voyage Home</li>
                <li>Star Trek V: The Final Frontier</li>
                <li>Star Trek VI: The Undiscovered Country</li>
                <li>Star Trek: Generations</li>
                <li>Star Trek: First Contact</li>
                <li>Star Trek: Insurrection</li>
                <li>Star Trek: Nemesis</li>
                <li>Star Trek</li>
                <li>Star Trek: Into Darkness</li>
                <li>Star Trek: Beyond</li>
              </Flipper>
            </ul>
          </Col>
        </Row>
      </div>
      <div className="mt-4 text-justify">
        In this exercise, you'll be constructing a component that's capable of executing jobs in a declarative fashion by mounting those <Highlight>Job</Highlight> components into the DOM one at a time. As each one finishes, the next one in line should be mounted to begin processing its own job. Looking towards the bottom of the page, you'll see a version of this component that doesn't quite work right, in that it mounts all jobs into the DOM at the same time, processing them concurrently (if you missed it while it was processing, just refresh the page). In this scenario, we want to treat them as steps in a workflow, with each previous step's completion being necessary before the next one can be started. Open the project's <FilePath>src/lessons/compound-components/exercise.js</FilePath> file to find a CountdownService and a Job component already written for you, along with a view consuming the JobPipeline component in its intended form. None of these items should need any modifications, you just need to fix the implementation of the JobPipeline component so that it processes its jobs sequentially as opposed to concurrently.
      </div>
      <div className="mt-4 text-justify">
        <ExerciseSandbox>
          <Exercise />
        </ExerciseSandbox>
      </div>
      <NavigationFooter lesson="compound-components" />
    </Lesson>
  );
};

export default CompoundComponentsLesson;
