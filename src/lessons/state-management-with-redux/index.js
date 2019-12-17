import React from 'react';

import { useRegisterNavLink } from '../../components/navigation/hooks';
import CodeBlock from '../../components/code-block';
import ExerciseSandbox from '../../components/exercise-sandbox';
import ExternalLink from '../../components/external-link';
import FilePath from '../../components/file-path';
import Highlight from '../../components/highlight';
import Lesson from '../../components/lesson';
import NavigationFooter from '../../components/navigation/footer';

import Exercise from './exercise';
import Tips from './tips';

const StateManagementWithReduxLesson = () => {
  useRegisterNavLink('https://redux.js.org/api/store', 'redux');
  useRegisterNavLink('https://react-redux.js.org/api/connect', 'react-redux');
  useRegisterNavLink('https://redux-toolkit.js.org/', 'redux-toolkit');

  return (
    <Lesson tips={<Tips />}>
      <h1>State Management With Redux</h1>
      <div className="mt-4 text-justify">
        Large applications tend to organically grow their own large state trees, and depending on how well you've architected your application, you may find yourself blurring the lines between those state segments, and building larger and more complex views that draw from disparate regions of your state tree. There are a variety of libraries out there to help manage state at the application level, with redux being one of the more popular ones.
      </div>
      <div className="mt-4 text-justify">
        Redux is a portmanteau of <Highlight>reducer</Highlight> and <Highlight>flux</Highlight>, flux being one of the original data paradigms behind React development. The idea is that a store should be delegated responsibility over a vertical slice of data within your application, e.g. users, or sales, or products, or anything else that can be considered a wholly-contained resource type or feature domain. Within traditional flux projects, you would maintain separate stores for each data concern, whereas with redux, you typically have a single monolithic <Highlight>store</Highlight> object governed by a root-level reducer function, which is most likely subdivided into smaller reducer units. In this way, the reducer functions become composable, and each layer of nested reducer functions governs a specific aspect of the overall data hierachy of your application.
      </div>
      <div className="mt-4 text-justify">
        You should be able to define boundaries in your data, which can then be delegated to specific reducer functions, which can be given an initial state and an <Highlight>action</Highlight> that defines some kind of operation to be performed, usually resulting in a state transformation handled by the reducer, which then returns a new state object with the transformation applied to the original input state. Your state object should be treated as immutable (either enforced programmatically via a library like Immutable.js, or else enforced by convention through the code review process), which always returns the same object reference if no transformation has been applied, or a new reference if any transformation has been applied. Consider the following example:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`const actionMap = {
  DECREMENT: (state) => ({
    ...state,
    value: state.value--,
  }),

  DECREMENT_BY: (state, action) => ({
    ...state,
    value: state.value - action.value,
  }),

  INCREMENT: (state) => ({
    ...state,
    value: state.value++,
  }),

  INCREMENT_BY: (state, action) => ({
    ...state,
    value: state.value + action.value,
  }),
};

const INITIAL_STATE = {
  value: 0,
};

const reducer = (state = INITIAL_STATE, action = {}) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        Using this reducer function, we can be confident that if we call it with no state and no action, we'll get back an object with a value property equal to 0. Passing it an actual starting state and a legitimate action object, if the action is of a type that this reducer actually cares about, it will invoke the appropriate transform function and return the new state after the transformation has been applied. If the action is of a type that this reducer doesn't care about, it simple returns the original state object, untouched. With redux, all dispatched actions flow through all reducer functions every single time they're dispatched. Redux handles composing the resulting state slices into an overall state tree that can be used to drive the application. In this way, you can isolate concerns over functional domains of your application, making each lower-level reducer responsible for smaller slices of data that are specifically relevant to the segment of the application for which they govern.
      </div>
      <div className="mt-4 text-justify">
        Redux is very unopinionated about what other technologies it's coupled to, providing a simple store object that has functions for <Highlight>dispatch</Highlight>, <Highlight>getState</Highlight>, <Highlight>replaceReducer</Highlight>, and <Highlight>subscribe</Highlight>. The <Highlight>getState</Highlight> function returns the full state object in its current form at any given time. The <Highlight>dispatch</Highlight> function allows you to pipe an action object through the store and all of its currently-associated reducer functions, applying any state transformations along the way. The <Highlight>replaceReducer</Highlight> function allows you to swap out the definition of a reducer at runtime, which allows you to dynamically bring other reducers online, in the case of lazy-loading application segments that may need to register their own reducers as they're brought into existence. Finally, the <Highlight>subscribe</Highlight> function is what lets you somehow couple redux to your own application.
      </div>
      <div className="mt-4 text-justify">
        There's a common companion library to redux, for React applications, called (obviously enough) <ExternalLink href="https://www.npmjs.com/package/react-redux">react-redux</ExternalLink>. It provides bindings between the redux store API and typical React lifecycle functions, so that components can automatically be notified whenever the state tree is updated, pull new or updated data from the store, and reevaluate their own UI with that updated data. You typically provide a <Highlight>mapStateToProps</Highlight> function, and optionally, a <Highlight>mapDispatchToProps</Highlight> function (or object), and use those to autosubscribe your component to state updates. When the state object reference changes, signalling a change in a value somewhere in its tree, connected components pull that updated data and provide new values to your components in the form of props. An example implementation might look something like this:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import { connect } from 'react-redux';
import { cancelShipment, editShipment } from './actions';
import Shipment from '../shipment';
import ShipmentsList from './component';

const mapStateToProps = (state, { userId }) => {
  const shipments = state.shipments.filter(shipment => shipment.userId === userId);

  return { shipments };
};

const mapDispatchToProps = {
  cancelShipment,
  editShipment,
};

const ShipmentsListContainer = ({ cancelShipment, editShipment, shipments }) => (
  <ShipmentsList>
    {shipments.map(shipment => (
      <Shipment
        {...shipment}
        key={shipment.guid}
        onCancel={cancelShipment}
        onEdit={editShipment}
      />
    ))}
  </ShipmentsList>
);

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentsListContainer);`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        This pattern is called a container component, or a smart component. When using a state management utility within your React application, convention is to have certain generic components that simply render whatever props they're given, without any real logic or programmatic context applied, which are commonly called <Highlight>presentation</Highlight> components (or <Highlight>dumb</Highlight> components), and other data-connected components, which do have some kind of contextual logic applied, and are often called <Highlight>container</Highlight> components (or <Highlight>smart</Highlight> components). Container components are typically responsible for sourcing data for more generic presentation components.
      </div>
      <div className="mt-4 text-justify">
        In the above example, we take a generic component, the ShipmentsList, and wrap it in a container component which is responsible for sourcing the list of shipments to be displayed, filtered by the current userId. As an admin of a system, you might have a global list of all shipments, which is unfiltered, or as a user, you may have a more specific list of shipments, which has had additional filters (date range, payment/shipped status, carrier, etc) applied. The point is that the ShipmentsList component itself doesn't care where the data comes from, it only cares that it's given a list of shipments to render, and it renders them. This can then be wired up to multiple different container components to provide data to it based on different criteria over the lifetime of the application. You would consume this container component by simply embedding it in a view and passing it a userId.
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import ShipmentsListContainer from './components/shipments-list';

const UserShipments = ({ userId }) => (
  <ShipmentsListContainer userId={userId} />
);

export default UserShipments;`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        Any time the underlying shipments data changes within the redux store, or the incoming userId prop is updated, the connected component will automatically reevaluate its list of shipments, and update its UI accordingly. Additionally, when the items passed in from the <Highlight>mapDispatchToProps</Highlight> parameter are available as props to the container component, and when those props are invoked, the output action object is automatically piped through your store and all associated reducer functions. A <Highlight>Shipment</Highlight> component might have a pencil icon that, when clicked, invokes its <Highlight>editShipment</Highlight> action function, which may set a bit in the redux store, which then alerts the container component to updated state, is reread automatically, and toggles that Shipment component UI into edit mode via prop updates. Magic!
      </div>
      <div className="mt-4 text-justify">
        Composing reducers is simple with redux as well. It exports a function called <Highlight>combineReducers</Highlight>, which simply takes an object hash of key names to reducer functions. The key names are used to set up the namespaces for use within this layer of the redux store, and the corresponding reducer functions are each invoked and passed their segment of the state for transformations, which are then updated under their own keyed namespaces. A state object of the following shape:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`{
  grid: {
    data: [],
    pageNumber: 1,
    pageSize: 50,
  },
  shipments: [],
  users: [],
};`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        Could be initialized with multiple layers of reducer functions like this:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`/* grid/reducer.js */
const INITIAL_STATE = {
  data: [],
  pageNumber: 1,
  pageSize: 50,
};

const actionMap = {};

export default (state = INITIAL_STATE, action = {}) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};`}</CodeBlock>
        <CodeBlock>{`/* shipments/reducer.js */
const INITIAL_STATE = [];

const actionMap = {};

export default (state = INITIAL_STATE, action = {}) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};`}</CodeBlock>
        <CodeBlock>{`/* users/reducer.js */
const INITIAL_STATE = [];

const actionMap = {};

export default (state = INITIAL_STATE, action = {}) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};`}</CodeBlock>
        <CodeBlock>{`/* reducer.js */
import { combineReducers } from 'redux';
import gridReducer from './grid/reducer';
import shipmentsReducer from './shipments/reducer';
import usersReducer from './users/reducer';

export default combineReducers({
  grid: gridReducer,
  shipments: shipmentsReducer,
  users: usersReducer,
});`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        You may notice some similarities between all of these reducer files. The default export of each individual reducer is basically identical. That's part of the compositional aspect of redux: all of these functions are invoked the same and expected to return the same so that they can be nested and combined in any order, and they'll all behave the same way as every other part of this system. The only thing that differentiates them is the list of action types they're interested in.
      </div>
      <div className="mt-4 text-justify">
        Now, redux has gotten a bit of a bad rap because of the amount of boilerplate needed to get a new action and associated state transformations added to the system. Typically, there might be a constants file to house the identifiers being used as action types. Those constants would then be imported into both an action-creators file, which would be home to the action functions, which would use those constants as their <Highlight>type</Highlight> property. The constants would also be imported into the reducer file, where they would be used to build the list of actions this reducer pays attention to. A lot of people then also separate the state transformations into their own action handlers file, with the reducer file simply pairing up action types to action handlers.
      </div>
      <div className="mt-4 text-justify">
        In this way, each individual piece of the system is individually testable, without having to test the full side-effects, unless integration testing is desired. You can confirm the action creator output shapes and the action handler output shapes individually via jest snapshot test, and you can write integration tests to confirm that the reducer is binding them together properly. At the component level, you can write simple tests with spy functions as props, to confirm that when a certain interaction occurs within the component (e.g. clicking a button), that the associated action creator prop (and thus, spy function) was invoked. You don't necessarily need to verify tha the button click results in the expected state transformation, because you've tested those aspects individually, and by virtue of the <Highlight>react-redux</Highlight> framework, you can essentially be assured that the button click will dispatch the action that will eventually result in the desired state update.
      </div>
      <div className="mt-4 text-justify">
        Other libraries, such as <ExternalLink href="https://www.npmjs.com/package/@reduxjs/redux-toolkit">redux-toolkit</ExternalLink> and <ExternalLink href="https://www.npmjs.com/package/redux-actions">redux-actions</ExternalLink>, try to cut down on the amount of boilerplate necessary to get redux plumbing in place, offering factory-type functions that output accessor props for things like the generated <Highlight>type</Highlight> constants, etc. Those libraries are out of scope for this lesson, but if you'd like to read more about them, there are links provided within this page for you to get additional information.
      </div>
      <div className="mt-4 text-justify">
        In this lesson's exercise, you'll be given a basic store and a small set of reducers, and will need to connect your component(s) to the store, as well as needing to implement a new action that will remove an item from the list. Remember to return a new reference for your state object any time you're making an update to a piece of state. Redux uses those references to determine when state has actually changed, in order to notify its subscribers that there's new data to be evaluated. Open the project's <FilePath>src/lessons/state-management-with-redux/exercise.js</FilePath> file to start learning how to implement a traditional redux pipeline. If you have time left over, you can try implementing the connect function on your own. You'd be surprised at just how simple it is under the hood!
      </div>
      <div className="mt-4 text-justify">
        <ExerciseSandbox>
          <Exercise />
        </ExerciseSandbox>
      </div>
      <NavigationFooter lesson="state-management-with-redux" />
    </Lesson>
  );
};

export default StateManagementWithReduxLesson;
