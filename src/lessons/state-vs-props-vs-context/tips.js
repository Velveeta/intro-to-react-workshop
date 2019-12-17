import React from 'react';

import Highlight from '../../components/highlight';

const StateVsPropsVsContextTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        React offers 3 traditional ways of getting your data to the components that need it: State, Props, and Context. Documentation is plentiful for all 3 of these methods, and you'll find additional help links at theh top of this page.
      </div>
      <div className="mt-3 text-justify">
        Local state is perfectly fine for data that needs to be managed just within the confines of the current component. It may or may not opt to hand that data off to child components in the form of props, but if it doesn't need to be shared with any ancestor or sibling components, it's perfectly acceptable to house it within the current component's state. This also helps limit the impact of updates to those data points, as React should only need to recalculate virtual DOM state from the current level downwards through the component tree.
      </div>
      <div className="mt-3 text-justify">
        When you have need of providing a single source of truth to govern other components under the current level in a component tree, especially if those components are very near to the current one, you'll want to consider using plain old props to pass that data. React's render lifecycle will automatically handle updating props in child components whenever they update in parent components, so all have you have to do is pass them down, and whenever they update, your subcomponent views will automatically be kept in sync for you. Beware of prop-threading certain values deep into your component views, though. You'll overcomplicate the APIs of intermediate components that don't need to know anything about the props you're passing down to their own children. Also beware of passing too large of a prop set down to subcomponents. If you have some giant blob of stateful object in your current component, and a subcomponent only needs 1 or 2 pieces of that in order to do its job, pass just those pieces rather than the entire object. Otherwise, updates to unrelated pieces of that object, resulting in a new object reference, may cause downstream components to recalculate their render state, even though the pieces they use didn't actually update.
      </div>
      <div className="mt-3 text-justify">
        Whenever you have need of providing a single source of truth to deeper places in your component tree, consider using the context API. It allows you to specify a Provider component that stores the current context value, and Consumer components that will receive those values, no matter how deeply they're nested in the component tree. Provider components are nestable, so if you need to contextually update the value within your component tree, depending on certain factors, you can always drop in another Provider (even using a Consumer wrapper around it to inherit the current context and modify it from that point downward), and output a modified context value to lower portions of your component tree. Remember, the Consumer component takes functional <Highlight>children</Highlight>, which it invokes and passes the current context value to. It's up to your <Highlight>children</Highlight> function to then return the actual children that will comprise that view.
      </div>
      <div className="mt-3 text-justify">
        Always try to be mindful of the method you're using to pass data from one segment of your application to another. Data should always be propagated downwards via props or context, and updates should propagate their way upwards via callbacks.
      </div>
    </div>
  </React.Fragment>
);

export default StateVsPropsVsContextTips;
