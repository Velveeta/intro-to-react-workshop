import React from 'react';

import Highlight from '../../components/highlight';

const ImperativeToDeclarativeTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        When considering how to wrap an imperative API in a declarative React component wrapper, ask yourself the following questions:
      </div>
      <div className="mt-3 text-justify">
        <ul>
          <li>Does this API interaction require any kind of setup? Do you need to <Highlight>new</Highlight> up an instance of anything? Do you need to provide defaults, and if so, are they dependent on props?</li>
          <li>Over the lifetime of these interactions, do you need to account for changing input parameters? Do you need to update coordinates for something like drawing on a canvas? Do you need to consider the impact of an asynchronous request if parameters change? If so, do you need to abort a pending request and reissue it? What are all of the consequences, if any, of parameters changing over time?</li>
          <li>Is there any cleanup that needs to occur when you're done with this component, such as disconnecting event listeners, removing elements from the DOM, or anything else?</li>
          <li>React offers lifecycle methods for all of these situations. Read up on the <Highlight>componentDidMount</Highlight>, <Highlight>componentDidUpdate</Highlight>, and <Highlight>componentWillUnmount</Highlight> lifecycle hooks. The bulk of what you need in order to accomplish this type of task can be accomplished with just these 3 lifecycle hooks.</li>
        </ul>
      </div>
      <div className="mt-3 text-justify">
        When creating a component for some kind of API wrapper, don't just think a single layer deep. If you look at the Theremin/Tone classes in this lesson, you'll see that the API connection itself is set up as a purpose-made wrapper for the <Highlight>AudioContext</Highlight> API, as opposed to the Theremin component wiring itself up to the <Highlight>AudioContext</Highlight> API and consider itself the API's component wrapper. The Theremin UI component itself then consumes that API wrapper in order to make a visual interaction space for that API. When authoring your own API wrapper components, try to keep the wrapper as specific to that API's interface as possible, and leave specific ways of using that API to the external components that may offer different types of interfaces to it.
      </div>
    </div>
  </React.Fragment>
);

export default ImperativeToDeclarativeTips;
