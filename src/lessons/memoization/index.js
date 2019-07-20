import { Button, Row } from 'react-bootstrap';
import React, { useCallback, useState } from 'react';

import { useRegisterNavLink } from '../../components/navigation/hooks';
import CodeBlock from '../../components/code-block';
import ExerciseSandbox from '../../components/exercise-sandbox';
import ExternalLink from '../../components/external-link';
import FilePath from '../../components/file-path';
import Highlight from '../../components/highlight';
import Lesson from '../../components/lesson';

import Exercise from './exercise';
import Tips from './tips';

import './index.css';

const genData = size => (new Array(size)).fill(true).map((_, index) => ({
  display: `This is item ${index + 1}`,
  guid: `guid-${index + 1}`,
}));

const Item = ({ children, style }) => (
  <div className="p-2 item" style={style}>
    <div>
      <p>
        <span>{children}</span>
      </p>
    </div>
    <div>
      <p>
        <span>This is some extra information.</span>
      </p>
    </div>
    <div>
      <p>
        <span>And this is even more information.</span>
      </p>
    </div>
  </div>
);
const PureItem = React.memo(Item);

const ListContainer = ({ children, label, onAddItem, onChange, value }) => (
  <div>
    <fieldset>
      <legend className="text-center">{label}</legend>
      <Row className="mb-2 p-2 justify-content-around">
        <input type="text" value={value} onChange={onChange} placeholder="Enter some text to add"  />&nbsp;
        <Button variant="primary" onClick={onAddItem}>Add Item</Button>
      </Row>
      <div className="listbox">{children}</div>
    </fieldset>
  </div>
);

const ListContainerWithGoodKeys = class extends React.Component {
  state = {
    data: genData(2000),
    value: '',
  };

  _onAddItem = () => {
    const { data, value } = this.state;

    this.setState({
      data: [{
        display: value,
        guid: `guid-${data.length + 1}`,
      }].concat(data),
      value: '',
    });
  };

  _onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { data, value } = this.state;

    return (
      <ListContainer
        label="Plain With Good Keys"
        onAddItem={this._onAddItem}
        onChange={this._onChange}
        value={value}
      >
        {data.map(record => (
          <Item key={record.guid}>{record.display}</Item>
        ))}
      </ListContainer>
    );
  }
};

const ListContainerWithBadKeys = class extends React.Component {
  state = {
    data: genData(2000),
    value: '',
  };

  _onAddItem = () => {
    const { data, value } = this.state;

    this.setState({
      data: [{
        display: value,
        guid: `guid-${data.length + 1}`,
      }].concat(data),
      value: '',
    });
  };

  _onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { data, value } = this.state;
    const keyBase = Math.round(Math.random() * 10); // scramble our keys each time we render

    return (
      <ListContainer
        label="Plain With Bad Keys"
        onAddItem={this._onAddItem}
        onChange={this._onChange}
        value={value}
      >
        {data.map((record, index) => (
          <Item key={keyBase + index}>{record.display}</Item>
        ))}
      </ListContainer>
    );
  }
};

const PureListContainerWithComputedProps = class extends React.Component {
  state = {
    data: genData(2000),
    value: '',
  };

  _onAddItem = () => {
    const { data, value } = this.state;

    this.setState({
      data: [{
        display: value,
        guid: `guid-${data.length + 1}`,
      }].concat(data),
      value: '',
    });
  };

  _onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { data, value } = this.state;
    const style = { fontSize: 'inherit' }; // This will always have a unique reference

    return (
      <ListContainer
        label="Pure With Computed Props"
        onAddItem={this._onAddItem}
        onChange={this._onChange}
        value={value}
      >
        {data.map(record => (
          <PureItem key={record.guid} style={style}>{record.display}</PureItem>
        ))}
      </ListContainer>
    );
  }
};

const PureListContainerWithGoodKeys = class extends React.Component {
  state = {
    data: genData(2000),
    value: '',
  };

  _onAddItem = () => {
    const { data, value } = this.state;

    this.setState({
      data: [{
        display: value,
        guid: `guid-${data.length + 1}`,
      }].concat(data),
      value: '',
    });
  };

  _onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { data, value } = this.state;

    return (
      <ListContainer
        label="Pure With Good Keys"
        onAddItem={this._onAddItem}
        onChange={this._onChange}
        value={value}
      >
        {data.map(record => (
          <PureItem key={record.guid}>{record.display}</PureItem>
        ))}
      </ListContainer>
    );
  }
};

const MemoizationLesson = () => {
  useRegisterNavLink('https://reactjs.org/docs/react-api.html#reactpurecomponent', 'React.PureComponent');
  useRegisterNavLink('https://reactjs.org/docs/react-api.html#reactmemo', 'React.memo');

  const [showDemo, setShowDemo] = useState(false);
  const [showExercise, setShowExercise] = useState(false);

  const toggleShowDemo = useCallback(() => {
    setShowDemo(!showDemo);
  }, [showDemo]);
  const toggleShowExercise = useCallback(() => {
    setShowExercise(!showExercise);
  }, [showExercise]);

  return (
    <Lesson tips={<Tips />}>
      <h1>Memoization</h1>
      <div className="mt-4 text-justify">
        Because of the way React determines what changes to flush to the DOM, at a certain point of scale, applications can start getting sluggish if their maintainers aren't mindful about certain updates. For class-based React.Component instances, if the render cascade makes it down to the component, its output state will be recalculated, and that will be diffed against an in-memory virtual DOM to determine what changes, if any, need to be flushed out to the actual DOM during the reconciliation process. The same goes for standard function-based components as well. So what happens when those components are home to massive trees of other nested components?
      </div>
      <div className="mt-4 text-justify">
        You can start experiencing a delay in feedback from the inception of an action to the result of that action, or dropped frames that make animations and redraw operations janky. In some of the worst-case scenarios, you can cause runaway render cascades, wherein some top-level prop update causes the whole component tree to reevaluate itself, which may cause a value to recompute itself, which may cause it to invoke some callback that propagates the updated value back to the top of the tree, which can cause the whole thing to happen again and again.
      </div>
      <div className="mt-4 text-justify">
        The render lifecycle fires more often than you can possibly imagine, and in most causes, it's not a problem. However, in some situations, especially when dealing with large collections of items in the UI, the impact to the overall experience of using the page can be dramatically impacted. One technique to help clue React in as to what has actually been updated in a collection of components is to make good use of the <Highlight>key</Highlight> property. The <Highlight>key</Highlight> should be a unique identifier that React can use to identify a given instance record within a list of components, even if those components change their order within the list, so that it can more easily determine what might have actually changes in that record's output to the DOM. However, that's not always enough, and this is where intelligent memoization can help tremendously.
      </div>
      <div className="mt-4 text-justify">
        React offers two methods for memoizing components themselves. The React.PureComponent superclass can be used for creating class-based components that you want to have operate in a memoized fashion, and React.memo can be used to create function-based components that operate in the same way. When one of these methods is used to create a component, React will do a shallow-comparison check, using an internally-cached copy of the last set of props that was passed to the target component, against the current set of props being passed to the target component. If all of the incoming props pass a strict-equality check, React squashes the render cascade at that level, and nothing is evaluated from that point down in the component tree.
      </div>
      <div className="mt-4 text-justify">
        Because of the additional shallow comparison that React performs against prop sets on components, there is a slight bit of overhead associated with creating <Highlight>pure</Highlight> components. The goal is to use them where it makes sense, and where the likely result is that you're going to save time overall by performing this extra bit of overhead against prop sets that are actually going to pass the strict equality check. If you have a huge list of components that's prone to actually change more often than not, then by declaring them as pure components, you're essentially doubling the work that React is having to do with those nodes. First, it will perfect its strict equality checks against all incoming props, and then, when one or more of them has legitimately updated, it will have to calculate the output element state and diff that to the virtual DOM. Examples where this for of thing may happen would be if you're calculating some internal object- (e.g. styles object) or array-type (e.g. filtered children) prop, and then passing it down to children. Even though the value may be identical from one render cycle to the next, if the references have changes, it will fail the shallow comparison and recalculate everything.
      </div>
      <div className="mt-4 text-justify">
        To get an idea of just how impactful it can be to migrate your components from regular to pure versions of themselves, take a look at the 3 examples below. Each one offers a list of 2000 items, and an option to add a new item to the list. You'll be able to see how a plain list with good <Highlight>key</Highlight> identifiers performs, alongside a plain list using bad <Highlight>key</Highlight> identifiers, as well as how badly things can perform when using pure render methods that fail their shallow comparison checks regularly, and finally, how much better these components can perform when using pure render methods in the right way.
      </div>
      <div className="mt-4 text-justify">
        Because of the performance impact of this demo, a toggle has been added to the page to mount and unmount it. Click the button below to {showDemo ? 'unmount' : 'mount'} the demo {showDemo ? 'from' : 'into'} the page.
      </div>
      <div className="mt-4 text-center">
        <Button variant="primary" onClick={toggleShowDemo}>{showDemo ? 'Unmount' : 'Mount'} the Demo</Button>
      </div>
      {showDemo && (
        <div className="mt-4 text-justify">
          <Row className="justify-content-around">
            <ListContainerWithGoodKeys />
            <ListContainerWithBadKeys />
          </Row>
          <Row className="mt-4 justify-content-around">
            <PureListContainerWithComputedProps />
            <PureListContainerWithGoodKeys />
          </Row>
        </div>
      )}
      <div className="mt-4 text-justify">
        One last thing to keep in mind when optimizing your components for pure render methods, is that Javascript primitive data types pass strict equality checks based on their <strong>value</strong>, whereas complex types like objects, arrays, and functions, only pass strict equality checks based on their references. Be careful how you're passing these types of properties. Look at the example below:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`const Paginator = ({ data, pageNumber, pageSize }) => {
  const pageData = data.slice(pageNumber * pageSize, pageSize);

  return <Datatable rows={pageData} />;
};`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        Even if you've tried to optimize your Datatable component by making it pure, the Paginator component is taking the incoming data and running a slice operation against it, which returns a new array reference every single time this component is rendered. That makes your pure Datatable component downstream from here is always going to fail its strict equality check and recalculate its render. The same thing can happen if you're running filter or map operations on an array and passing that result down as props, or creating new objects as you build up a single record from disconnected data points. Libraries like <ExternalLink href="https://www.npmjs.com/package/reselect">reselect</ExternalLink> and <ExternalLink href="https://www.npmjs.com/package/re-reselect">re-reselect</ExternalLink> can help with situations like these, at the cost of larger memory footprints, depending on how extensively you use them.
      </div>
      <div className="mt-4 text-justify">
        For this lesson's exercise, you'll be trying to streamline the render performance of a list of tiles. There's a text box that represents some random generic form field that somebody has associated with the same component that's holding state for the list of tiles, and each tile has a button that can be clicked to remove it from the list. When you type in the text box, or when you click to remove a Tile, you should feel how sluggish the UI is, as the entire set of Tile components is reevaluated for rendering. See if you can figure out how to streamline this component a bit, without removing the form field from state. Feel free to use memoization techniques, change the shape of inputs from one component to the other, whatever you feel you need to do in order to get it feeling snappy. Open the project's <FilePath>src/lessons/memoization/exercise.js</FilePath> file to get started trying to fix some of the performance hurdles in this page.
      </div>
      <div className="mt-4 text-justify">
        Because of the performance impact of this exercise, a toggle has been added to the page to mount and unmount it. Click the button below to {showExercise ? 'unmount' : 'mount'} the exercise {showExercise ? 'from' : 'into'} the page.
      </div>
      <div className="mt-4 text-center">
        <Button variant="primary" onClick={toggleShowExercise}>{showExercise ? 'Unmount' : 'Mount'} the Exercise</Button>
      </div>
      {showExercise && (
        <div className="mt-4 text-justify">
          <ExerciseSandbox>
            <Exercise />
          </ExerciseSandbox>
        </div>
      )}
    </Lesson>
  );
};

export default MemoizationLesson;
