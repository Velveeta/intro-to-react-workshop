import React from 'react';

import CodeBlock from '../../components/code-block';
import Highlight from '../../components/highlight';

const StateManagementWithReduxTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        Redux allows you to manage your entire application's state at a high level, and conceptualize your application as a series of increasingly smaller slices of related data. These slices then delegate out to actions and reducers to manage their own values, and any subscribed components are then alerted to updated state whenever those values change.
      </div>
      <div className="mt-3 text-justify">
        Your action creator functions should just output a plain object (they may also output a function, which is called a <Highlight>thunk</Highlight>, but that's outside the scope of this lesson). That action object is then piped through every reducer function registered with the store, and the cumulative state transformation is stitched together by the framework. A typical action creator function might look like this:
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
        The reducer function sits in between the action creator and the state transformation itself, to map one to the other. In some cases, it may be a simple 1:1 mapping an action to a simple transform, whereas in other cases, there may be more complex logic that occurs at this layer. It those cases, it's sometimes easier to isolate that logic into its own handler function. A typical reducer might look like this:
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`import { MY_ACTION_TYPE } from './constants';
import { myActionHandler } from './action-handlers';

const INITIAL_STATE = {};

const actionMap = {
  [MY_SIMPLE_ACTION_TYPE]: (state, action) => ({
    ...state,
    someField: action.payload,
  }),

  [MY_MORE_COMPLEX_ACTION_TYPE]: (state, action) => myActionHandler(state, action),
};

export default (state = INITIAL_STATE, action = {}) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};`}</CodeBlock>
      </div>
      <div className="mt-3 text-justify">
        An action handler should simply receive the current state object, the action object, and determine how that action object should transform that state object, if at all, and return the resulting state object. If the state has been updated, it should always be returned as a new object copy. A typical action handler might look like this:
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`// Remember to always return a copy of state if it's being updated
export const myActionHandler = (state, { someParameter, orListOfParameters }) => ({
  ...state,
  someParameter,
  orListOfParameters,
});`}</CodeBlock>
      </div>
    </div>
  </React.Fragment>
);

export default StateManagementWithReduxTips;
