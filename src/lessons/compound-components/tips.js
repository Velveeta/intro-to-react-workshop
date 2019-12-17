import React from 'react';

import CodeBlock from '../../components/code-block';

const CompoundComponentsTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        React element instances are the outputs that React deals with to determine what changes need to be flushed out to the DOM. It doesn't care how they get into the state they're in, it just takes them as they are. They look something like this, typically:
      </div>
      <CodeBlock>{`{
  "type": "span",
  "key": null,
  "ref": null,
  "props": {},
  "_owner": null,
  "_store": {}
}`}</CodeBlock>
      <div className="mt-3 text-justify">
        React component transformations are relatively inexpensive operations, because they're just transforms that mutate an object in memory that represents some component instance. Mapping and cloning React component instances can be done over and over on each render cycle without really impacting your application's performance, unless you're dealing with <i>huge</i> collections of elements.
      </div>
      <div className="mt-3 text-justify">
        What matters is the object representing the end result of those transformations, which is what then gets diffed in order to determine what changes to flush out to the DOM. Any rules that you can apply to collections of items in any normal Javascript function can also be applied to collections of React elements, including filter/map/reduce operations, adding/removing/modifying prop values, or adding extra layers to items, such as wrapping each child in a div or another component altogether. Remember, these are just functions feeding other functions all the way down. Between React.Children and React.cloneElement, you can do just about anything you can think of to transform a component's children prior to output.
      </div>
    </div>
  </React.Fragment>
);

export default CompoundComponentsTips;
