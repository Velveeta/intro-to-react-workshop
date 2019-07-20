import React from 'react';

const ComponentBaseDevelopmentTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        When trying to decide where to break apart a large component into subcomponents, consider entire blocks that look similar to each other as an obvious starting point. Those can be pulled out and turned into a component of their own, and then reembedded into the original view.
      </div>
      <div className="mt-3 text-justify">
        Don't stop there, though. Look for areas where a data structure is being iterated over in some fashion, in order to generate a list of nodes of some kind. The contents of that loop are typically also ideal candidates to be turned into their own component. Look for render functions of any kind. If a component has already opted to break its view apart into separate functions, those functions likely already house what can easily be turned into separate subcomponents.
      </div>
      <div className="mt-3 text-justify">
        If you find yourself using the same sets of props over and over again (e.g. the same class names, same styles, same labels, etc), even if they're on a low-level item like a div or a span, you may want to consider turning that into a component as well, because you're giving identical treatment to certain types of nodes over and over. If that treatment changes in the future, it would stand to reason that it's going to change consistently for all of those similarly-formatted items, so by turning them into a component type, you can consolidate maintenance efforts on that one component for future updates.
      </div>
      <div className="mt-3 text-justify">
        One question a lot of people have is how small is too small to make something its own component. There's no explicit answer to be given here, and if it's just a single node that you're rebranding for the sake of turning say, a div into a component, and proxying all of its incoming props through to the outgoing div, there's no real point in that. Converting a snippet of JSX into its own component should add overall value, so if you're not saving yourself work or future maintenance hassles, or adding to the semantics of the markup to at least make the view easier to read and intuit at a glance, it's probably not worth creating a component out of it.
      </div>
    </div>
  </React.Fragment>
);

export default ComponentBaseDevelopmentTips;
