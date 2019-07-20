import React from 'react';

import CodeBlock from '../../components/code-block';
import Highlight from '../../components/highlight';

const StateManagementWithReduxTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        Redux allows you to manage your entire application's state at a high level, and conceptualize your application as a series of increasingly smaller slices of groupings of related data. These groups are then delegates out to actions and reducers to manage their state, and any subscribed components are then alerted to that updated state, so that they can query the state tree for their updated data values.
      </div>
      <div className="mt-3 text-justify">
        Your action creator functions should just output a plain object (they may also output a function, which is called a <Highlight>thunk</Highlight>, but is outside the scope of this lesson). That action object is then piped through every reducer function registered with the store, and the cumulative state transformation is stitched together by the framework. A typical action creator function might look like this:
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`import { MY_ACTION_TYPE } from './constants';

export const myAction = (someParameter, orListOfParameters) => ({
  someParameter,
  orListOfParameters,
  type: MY_ACTION_TYPE,
});`}</CodeBlock>
      </div>
      <div className="mt-3 text-justify">
        The reducer function sits in between the action creator and the action handler, to link one up to the other. In some cases, there may be more complex logic that occurs at this layer, which is why it's typically easier to use the reducer as a sort of link table. A lot of the time, it's a 1:1 mapping of action creator to handler, but it leaves room for more work to be done, if needed. A typical reducer might look like this:
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`import { MY_ACTION_TYPE } from './constants';
import { myActionHandler } from './action-handlers';

const INITIAL_STATE = {};

const actionMap = {
  [MY_ACTION_TYPE]: (state, action) => myActionHandler(state, action),
};

export default (state = INITIAL_STATE, action = {}) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};`}</CodeBlock>
      </div>
      <div className="mt-3 text-justify">
        The action handler function should simply receive the current state object, the action object, and determine how that action object should transform that state object, if at all, and then return the updated state object. If the state has been updated, it should always be returned with a new object. A typical action handler might look like this:
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`// Remember to always return a copy of state if it's being updated
export const myActionHandler = (state, { someParameter, orListOfParameters }) => ({
  ...state,
  someParameter,
  orListOfParameters,
});`}</CodeBlock>
      </div>
      <div className="mt-3 text-justify">
        If you were to try to implement your own <Highlight>connect</Highlight> function, you're now getting into some more advanced territory. In this situation, you would want to implement a factory type of function which would receive your <Highlight>mapStateToProps</Highlight> and <Highlight>mapDispatchToProps</Highlight> parameters, then return another function that would receive a <Highlight>Component</Highlight> parameter. That function would then need to create a new kind of <Highlight>WrappedComponent</Highlight> class that would be able to subscribe to the redux store when it mounts, unsubscribe from it with it unmounts, and every time state updates, call a function that would use the updated state object to fetch updated prop values from mapStateToProps, as well as making sure the mapDispatchToProps functions are bound to your store. All of that can then be stored in that component's local state, which when updated, will trigger a rerender of your component, passing all of its state to the target Component that it renders. Finally, you'll need to wrap that component in a context <Highlight>Consumer</Highlight> from <Highlight>ReactReduxContext</Highlight>, which will receive the <Highlight>store</Highlight> itself from the react-redux <Highlight>Provider</Highlight> that wraps the root of the component tree. It can then pass that store to your <Highlight>WrappedComponent</Highlight> class, for it to use for subscribing and pulling that updated state from.
      </div>
    </div>
  </React.Fragment>
);

export default StateManagementWithReduxTips;
